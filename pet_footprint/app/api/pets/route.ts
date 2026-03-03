import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  "https://oudmrgwwollcxxxfrpik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZG1yZ3d3b2xsY3h4eGZycGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMTIxMzcsImV4cCI6MjA4Nzc4ODEzN30.f4k2BofMJkk3Mz1zkTWX8qmzbhN3sGUGOnLPk2CdxAo"
)

export async function GET() {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, image_url } = body

  const { error } = await supabase
    .from("pets")
    .insert({ name, image_url })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ success: true })
}