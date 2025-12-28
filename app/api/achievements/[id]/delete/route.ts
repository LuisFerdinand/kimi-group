import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { achievements } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await requireAdmin();
    const { id } = await params;
    const achievementId = parseInt(id);

    if (isNaN(achievementId)) {
      return NextResponse.json({ error: "Invalid achievement ID" }, { status: 400 });
    }

    // Check if achievement exists
    const existing = await db
      .select()
      .from(achievements)
      .where(eq(achievements.id, achievementId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }

    await db.delete(achievements).where(eq(achievements.id, achievementId));

    redirect("/dashboard/achievements");
  } catch (error) {
    console.error("Error deleting achievement:", error);
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete achievement." },
      { status: 500 }
    );
  }
}