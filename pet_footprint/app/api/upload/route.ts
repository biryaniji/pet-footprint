import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  "https://oudmrgwwollcxxxfrpik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZG1yZ3d3b2xsY3h4eGZycGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMTIxMzcsImV4cCI6MjA4Nzc4ODEzN30.f4k2BofMJkk3Mz1zkTWX8qmzbhN3sGUGOnLPk2CdxAo"
)

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File
  const fileName = formData.get("fileName") as string

  const { error } = await supabase.storage
    .from("pet-images")
    .upload(fileName, file)

  if (error) return NextResponse.json({ error }, { status: 500 })

  const { data: urlData } = supabase.storage
    .from("pet-images")
    .getPublicUrl(fileName)

  return NextResponse.json({ url: urlData.publicUrl })
}