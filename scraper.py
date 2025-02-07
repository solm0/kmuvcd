import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime

class EventScraper:
    def __init__(self, year):
        self.year = year
        self.all_events = []
        self.url = f"https://www.kookmin.ac.kr/user/scGuid/scSchedule/index.do?yyyy={self.year}"

    def scrape_page(self):
        try:
            response = requests.get(self.url)
            response.raise_for_status()  # To check if the request was successful
            soup = BeautifulSoup(response.content, "html.parser")
            events = soup.find("table", id="monthTable").find_all("tr")

            for event in events:
                title = event.find("td", class_="cal_desc")
                date_str = title.find_previous_sibling("td") if title else None

                if date_str and title:
                    pattern = r"(\d{1,2})\.(\d{1,2})\s\(\w\)\s~\s(\d{1,2})\.(\d{1,2})\s\(\w\)"
                    match = re.match(pattern, date_str.text)
                    if match:
                        month_start = match.group(1)
                        day_start = match.group(2)
                        month_end = match.group(3)
                        day_end = match.group(4)
                        
                        start_date = f"{self.year}-{month_start.zfill(2)}-{day_start.zfill(2)}"
                        end_date = f"{self.year}-{month_end.zfill(2)}-{day_end.zfill(2)}"

                        event_data = {
                            "title": title.text.strip(),
                            "start_date": start_date,
                            "end_date": end_date,
                        }
                        self.all_events.append(event_data)
                        
        except requests.RequestException as e:
            print(f"Error during HTTP request: {e}")
        except Exception as e:
            print(f"An error occurred during parsing: {e}")

    def get_events(self):
        return self.all_events

# Usage
scraper = EventScraper(2025)
scraper.scrape_page()
print(scraper.get_events())
scraped_data = scraper.get_events()

# Send data to Next.js API
api_url = "https://kmuvcd.vercel.app/api/schedule"
response = requests.post(api_url, json=scraped_data)

if response.status_code == 200:
    print("Data successfully sent to Next.js..000.!")
else:
    print(f"Error: {response.status_code}, {response.text}")