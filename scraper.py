import requests
from bs4 import BeautifulSoup
import re
import os
import json
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

    def save_to_json(self, filename="app/data/academic_calendar.json"):
        os.makedirs(os.path.dirname(filename), exist_ok=True)

        try:
            with open(filename, "w", encoding="utf-8") as f:
                json.dump(self.all_events, f, ensure_ascii=False, indent=4)
            print(f"Data saved to {filename}")
        except Exception as e:
            print(f"Error saving JSON: {e}")

# Usage
scraper = EventScraper(2025)
scraper.scrape_page()
scraper.save_to_json()