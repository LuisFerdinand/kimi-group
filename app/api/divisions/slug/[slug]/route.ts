// app/api/divisions/slug/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDivisionBySlug } from "@/lib/api/divisions";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const division = await getDivisionBySlug(params.slug);
    
    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
    }

    return NextResponse.json(division);
  } catch (error) {
    console.error("Error fetching division by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch division" },
      { status: 500 }
    );
  }
}
