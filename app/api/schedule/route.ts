import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define TypeScript types for the event
interface Event {
  title: string;
  start_date: string;
  end_date: string;
}

// Define the file path where events will be stored
const eventsFilePath = path.join(process.cwd(), "data", "events.json");

export async function POST(req: Request) {
  try {
    const events: Event[] = await req.json();  // Parse the incoming JSON data

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    console.log("✅ Received events:", events);

    // Read the existing events data from the JSON file
    let existingEvents: Event[] = [];
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

    return NextResponse.json({ success: true, message: "Events received and saved successfully" });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}