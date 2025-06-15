import { connectDB } from '@/lib/db';
import { Marker } from '@/lib/models/marker';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const marker = await Marker.create(data);
  return NextResponse.json(marker);
}


export async function GET() {
  const db = await connectDB();

  try {
    const markers = await Marker.find();
    console.log("Fetched markers:", markers);
    return NextResponse.json(markers);
  } catch (error) {
    console.error("❌ Error fetching markers:", error);
    return NextResponse.json({ error: 'Failed to fetch markers' }, { status: 500 });
  }
}
