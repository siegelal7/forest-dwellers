import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Successfully connected to MongoDB!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
