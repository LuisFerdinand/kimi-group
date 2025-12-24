// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCategories, createCategory } from "@/lib/api/categories";
import { requireEditor } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireEditor();
    const data = await request.json();
    const category = await createCategory(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create category" },
      { status: 500 }
    );
  }
}
