/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
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
    const teamMemberId = parseInt(id);

    if (isNaN(teamMemberId)) {
      return NextResponse.json({ error: "Invalid team member ID" }, { status: 400 });
    }

    // Check if team member exists
    const existing = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, teamMemberId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    await db.delete(teamMembers).where(eq(teamMembers.id, teamMemberId));

    redirect("/dashboard/team-members");
  } catch (error) {
    console.error("Error deleting team member:", error);
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete team member." },
      { status: 500 }
    );
  }
}