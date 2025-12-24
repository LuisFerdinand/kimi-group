// app/api/divisions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDivisions, createDivision } from "@/lib/api/divisions";
import { requireEditor } from "@/lib/auth";

export async function GET() {
  try {
    const divisions = await getDivisions();
    return NextResponse.json(divisions);
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return NextResponse.json(
      { error: "Failed to fetch divisions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireEditor();
    const data = await request.json();
    const division = await createDivision(data);
    return NextResponse.json(division, { status: 201 });
  } catch (error) {
    console.error("Error creating division:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create division" },
      { status: 500 }
    );
  }
}