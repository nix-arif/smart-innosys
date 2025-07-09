import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userId = await request.json();
  await createSession(userId.userId);
  return NextResponse.json({
    message: "From API Session",
  });
}
