import axios from 'axios';
import { load } from 'cheerio';
import * as fs from 'fs';

interface Event {
  title: string;
  start_date: string;
  end_date: string;
}

class EventScraper {
  year: number;
  all_events: Event[] = [];
  url: string;

  constructor(year: number) {
    this.year = year;
    this.url = `https://www.kookmin.ac.kr/user/scGuid/scSchedule/index.do?yyyy=${this.year}`;
  }

  // Scrape the page
  async scrapePage(): Promise<void> {
    try {
      const response = await axios.get(this.url);
      const $ = load(response.data);

      const events = $("table#monthTable").find("tr");

      events.each((_, event) => {
        const title = $(event).find("td.cal_desc").text().trim();
        const dateStr = $(event).find("td").first().text().trim();
        const pattern = /(\d{1,2})\.(\d{1,2})\s\(\w\)\s~\s(\d{1,2})\.(\d{1,2})\s\(\w\)/;

        const match = dateStr.match(pattern);
        if (match) {
          const [_, monthStart, dayStart, monthEnd, dayEnd] = match;

          const startDate = `${this.year}-${monthStart.padStart(2, "0")}-${dayStart.padStart(2, "0")}`;
          const endDate = `${this.year}-${monthEnd.padStart(2, "0")}-${dayEnd.padStart(2, "0")}`;

          this.all_events.push({
            title,
            start_date: startDate,
            end_date: endDate,
          });
        }
      });
    } catch (error) {
      console.error("Error during scraping:", error);
    }
  }

  // Return the scraped events
  getEvents(): Event[] {
    return this.all_events;
  }

  // Send scraped data to the Next.js API
  async sendDataToApi() {
    try {
      const apiUrl = 'https://kmuvcd.vercel.app/api/schedule';  // Replace with your endpoint URL
      const response = await axios.post(apiUrl, this.getEvents());
      
      if (response.status === 200) {
        console.log("Data successfully sent to Next.js!");
      } else {
        console.error(`Error sending data to API: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  }
}

// Usage
const scraper = new EventScraper(2025);
scraper.scrapePage().then(() => {
  const events = scraper.getEvents();
  console.log(events);

  // Send data to Next.js API after scraping
  scraper.sendDataToApi();
});