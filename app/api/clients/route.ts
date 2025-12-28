/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { requireEditor } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// GET: Fetch all clients
export async function GET() {
  try {
    const allClients = await db
      .select()
      .from(clients)
      .orderBy(clients.order);
    
    return NextResponse.json(allClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

// POST: Create a new client
export async function POST(request: NextRequest) {
  try {
    const user = await requireEditor();
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.logoUrl) {
      return NextResponse.json(
        { error: "Name and logo URL are required" },
        { status: 400 }
      );
    }

    // Validate logoUrl format
    if (!/^https?:\/\/.+\..+/.test(body.logoUrl)) {
      return NextResponse.json(
        { error: "Invalid logo URL format" },
        { status: 400 }
      );
    }

    const newClient = await db
      .insert(clients)
      .values({
        name: body.name,
        logoUrl: body.logoUrl,
        order: body.order || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    revalidatePath("/dashboard/clients");
    revalidatePath("/");

    return NextResponse.json({
      message: "Client created successfully",
      client: newClient[0],
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to create client." },
      { status: 500 }
    );
  }
}