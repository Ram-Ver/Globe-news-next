import { connectDB } from '@/lib/db';
import { Marker } from '@/lib/models/marker';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updated = await Marker.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Marker.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
