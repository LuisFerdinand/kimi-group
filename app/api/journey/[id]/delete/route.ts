/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { journeyItems } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();
    const { id } = await params;
    const journeyId = parseInt(id);

    if (isNaN(journeyId)) {
      return NextResponse.json({ error: "Invalid journey item ID" }, { status: 400 });
    }

    // Check if journey item exists
    const existing = await db
      .select()
      .from(journeyItems)
      .where(eq(journeyItems.id, journeyId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Journey item not found" }, { status: 404 });
    }

    await db.delete(journeyItems).where(eq(journeyItems.id, journeyId));

    redirect("/dashboard/journey");
  } catch (error) {
    console.error("Error deleting journey item:", error);
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete journey item." },
      { status: 500 }
    );
  }
}