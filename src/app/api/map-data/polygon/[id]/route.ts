import { connectDB } from '@/lib/db';
import { Polygon } from '@/lib/models/polygon';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updated = await Polygon.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Polygon.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
