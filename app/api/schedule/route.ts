// app/api/schedule/route.ts
import { NextResponse } from 'next/server';

type Event = {
  title: string;
  start_date: string;
  end_date: string;
};

// Temporary in-memory storage for events (you can replace this with a database later)
let allEvents: Event[] = [];

export async function POST(request: Request) {
  try {
    const events: Event[] = await request.json(); // Parse the incoming JSON body
    // Save the events to the in-memory array (replace with DB later)
    allEvents = events;

    return NextResponse.json({
      message: 'Events received successfully',
      data: events,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return the stored events (you could replace this with a DB query in a real app)
    return NextResponse.json({
      message: 'Events fetched successfully',
      data: allEvents,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch the events' },
      { status: 500 }
    );
  }
}