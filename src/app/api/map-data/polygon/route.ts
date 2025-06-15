import { connectDB } from '@/lib/db';
import { Polygon } from '@/lib/models/polygon';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json(); // expects { label: string, points: [[lat, lng], ...] }
  const polygon = await Polygon.create(data);
  return NextResponse.json(polygon);
}

export async function GET() {
  await connectDB();
  const polygons = await Polygon.find();
  return NextResponse.json(polygons);
}
