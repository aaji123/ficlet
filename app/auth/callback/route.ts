import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  
  // We changed the query param to "next" to match Supabase standards
  const next = searchParams.get("next") ?? "/generate";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Success! Redirect the user back to the generate page
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If no code, or if exchange failed, send them back to login
  return NextResponse.redirect(`${origin}/login`);
}