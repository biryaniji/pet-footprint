import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://oudmrgwwollcxxxfrpik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZG1yZ3d3b2xsY3h4eGZycGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMTIxMzcsImV4cCI6MjA4Nzc4ODEzN30.f4k2BofMJkk3Mz1zkTWX8qmzbhN3sGUGOnLPk2CdxAo"
)