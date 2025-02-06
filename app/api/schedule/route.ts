import { NextResponse } from 'next/server';

type Event = {
  title: string;
  start_date: string;
  end_date: string;
};

export async function POST(request: Request) {
  try {
    const events: Event[] = await request.json(); // Parse the incoming JSON body
    // Optionally, you can process the events data here, e.g., save to a database

    // For now, return a success response with the received events data
    return NextResponse.json({
      message: 'Events received successfully',
      data: events,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}