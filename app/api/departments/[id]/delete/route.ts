/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departments } from "@/lib/db/schema";
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
    const departmentId = parseInt(id);

    if (isNaN(departmentId)) {
      return NextResponse.json({ error: "Invalid department ID" }, { status: 400 });
    }

    // Check if department exists
    const existing = await db
      .select()
      .from(departments)
      .where(eq(departments.id, departmentId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }

    await db.delete(departments).where(eq(departments.id, departmentId));

    redirect("/dashboard/departments");
  } catch (error) {
    console.error("Error deleting department:", error);
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete department." },
      { status: 500 }
    );
  }
}