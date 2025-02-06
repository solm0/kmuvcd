import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const events = await req.json(); // Get the JSON data from the request body

    // Process the events data (e.g., save to a database)
    console.log(events);

    // Return a response indicating success
    return NextResponse.json({ message: 'Data successfully received and processed!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Error processing request.' }, { status: 500 });
  }
}