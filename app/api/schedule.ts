import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Define TypeScript types for the event
interface Event {
  title: string;
  start_date: string;
  end_date: string;
}

// Define the file path where events will be stored
const eventsFilePath = path.join(process.cwd(), "data", "events.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const events: Event[] = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    console.log("✅ Received events:", events);

    // Read the existing events data from the JSON file
    let existingEvents = [];
    try {
      const fileContent = fs.readFileSync(eventsFilePath, "utf-8");
      existingEvents = JSON.parse(fileContent);
    } catch {
      console.log("No existing events found, starting with an empty array.");
    }

    // Add the new events to the existing data
    const updatedEvents = [...existingEvents, ...events];

    // Save the updated events back to the JSON file
    fs.writeFileSync(eventsFilePath, JSON.stringify(updatedEvents, null, 2));

    console.log("✅ Events saved to JSON");

    return res.status(200).json({ success: true, message: "Events received and saved successfully" });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}