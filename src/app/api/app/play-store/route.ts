import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    latest_version: "1.3.0",
    min_required_version: "1.3.0",
    update_url: "https://play.google.com/store/apps/details?id=com.arkynox.picdb"
  });
}