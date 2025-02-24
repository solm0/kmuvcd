import requests
from bs4 import BeautifulSoup
import re
import os
from datetime import date
import argparse
import sys

api_token = os.getenv("SCRAPER_STRAPI_API_TOKEN")

if not api_token:
    print("No API token found! Please set SCRAPER_STRAPI_API_TOKEN.")
    sys.exit(1)

def validate_year(year):
    """Ensure the year is a four-digit number."""
    if not isinstance(year, int) or year < 1000 or year > 9999:
        raise ValueError(f"Invalid year: {year}. Please enter a four-digit year (e.g., 2024).")

class EventScraper:
    def __init__(self, year: int = None):
        """Allow manually setting a year, default to the current year if None."""
        self.year = year if year is not None else int(date.today().strftime("%Y"))
        validate_year(self.year)  # Validate the provided or default year
        self.all_events = []
        self.url = f"https://www.kookmin.ac.kr/user/scGuid/scSchedule/index.do?yyyy={self.year}"

    def scrape_page(self):
        try:
            print(f"Attempting to scrape data for the year {self.year} from {self.url}")
            response = requests.get(self.url)
            response.raise_for_status()  # Ensure successful request
            
            soup = BeautifulSoup(response.content, "html.parser")
            events = soup.find("table", id="monthTable").find_all("tr")

            for event in events:
                name = event.find("td", class_="cal_desc")
                date_str = name.find_previous_sibling("td") if name else None

                if date_str and name:
                    pattern = r"(\d{1,2})\.(\d{1,2})\s\(\w\)\s~\s(\d{1,2})\.(\d{1,2})\s\(\w\)"
                    match = re.match(pattern, date_str.text.strip())

                    if match:
                        month_start = int(match.group(1))
                        day_start = int(match.group(2))
                        month_end = int(match.group(3))
                        day_end = int(match.group(4))

                        year_start = self.year + 1 if month_start in [1, 2] else self.year
                        year_end = self.year + 1 if month_end in [1, 2] else self.year

                        start_date = f"{year_start}-{month_start:02d}-{day_start:02d}"
                        end_date = f"{year_end}-{month_end:02d}-{day_end:02d}"

                        event_data = {
                            "name": name.text.strip(),
                            "startDate": start_date,
                            "endDate": end_date,
                        }
                        self.all_events.append(event_data)
                    else:
                        print(f"Skipping unrecognized date format: {date_str.text.strip()}")
                        
        except requests.RequestException as e:
            print(f"Error during HTTP request: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"An error occurred during parsing: {e}")
            sys.exit(1)

    def post_to_strapi(self):
        api_url = "https://kmuvcd-strapi.onrender.com/api/kookmins"

        headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json"
        }

        for event in self.all_events:
            data = { 
                "data": {
                    "name": event["name"],
                    "category": "kookmins",
                    "startDate": event["startDate"],
                    "endDate": event["endDate"],
                }
            }

            try:
                response = requests.post(api_url, json=data, headers=headers)
                response.raise_for_status()  # This will raise an HTTPError for bad responses
                print(f"Event '{event['name']}' successfully posted to Strapi.")
            except requests.RequestException as e:
                print(f"Error posting event '{event['name']}': {str(e)}")

def main():
    # Argument parsing
    parser = argparse.ArgumentParser(description="Scrape events for a specific year.")
    parser.add_argument(
        "year", type=int, nargs="?", default=None, help="Year to scrape events for"
    )
    args = parser.parse_args()

    # Use the provided year or the current year if no argument is given
    scraper = EventScraper(year=args.year)
    scraper.scrape_page()
    scraper.post_to_strapi()

if __name__ == "__main__":
    main()