
// app/api/divisions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDivision, updateDivision, deleteDivision } from "@/lib/api/divisions";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    const division = await getDivision(id);
    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
    }

    return NextResponse.json(division);
  } catch (error) {
    console.error("Error fetching division:", error);
    return NextResponse.json(
      { error: "Failed to fetch division" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    const data = await request.json();
    const division = await updateDivision(id, data);
    return NextResponse.json(division);
  } catch (error) {
    console.error("Error updating division:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update division" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    await deleteDivision(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting division:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete division" },
      { status: 500 }
    );
  }
}
