import { type NextRequest, NextResponse } from "next/server"
import { analyzeSite } from "@/lib/lighthouse"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    const result = await analyzeSite(url)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in audit API:", error)
    return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 })
  }
}

