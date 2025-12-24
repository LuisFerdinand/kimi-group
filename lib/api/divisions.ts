// lib/api/divisions.ts
import { db } from "@/lib/db";
import { brandDivisions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function getDivisions() {
  return await db.select().from(brandDivisions);
}

export async function getDivision(id: number) {
  const [division] = await db.select().from(brandDivisions).where(eq(brandDivisions.id, id));
  return division;
}

export async function getDivisionBySlug(slug: string) {
  const [division] = await db.select().from(brandDivisions).where(eq(brandDivisions.slug, slug));
  return division;
}

export async function createDivision(data: {
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  backgroundImage?: string;
  logo?: string;
  color?: string;
  stats?: Record<string, unknown>;
  featured?: boolean;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }

  const [newDivision] = await db
    .insert(brandDivisions)
    .values({
      name: data.name,
      slug: data.slug,
      tagline: data.tagline,
      description: data.description,
      backgroundImage: data.backgroundImage,
      logo: data.logo,
      color: data.color,
      stats: data.stats || {},
      featured: data.featured || false,
      authorId: user.id,
    })
    .returning();

  return newDivision;
}

export async function updateDivision(
  id: number,
  data: {
    name?: string;
    slug?: string;
    tagline?: string;
    description?: string;
    backgroundImage?: string;
    logo?: string;
    color?: string;
    stats?: Record<string, unknown>;
    featured?: boolean;
  }
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }

  // Check if user has permission to edit this division
  const [division] = await db.select().from(brandDivisions).where(eq(brandDivisions.id, id));
  if (!division) {
    throw new Error("Division not found");
  }

  // Editors can only edit their own divisions
  if (
    user.role === "editor" && 
    division.authorId !== user.id
  ) {
    throw new Error("Permission denied");
  }

  const [updatedDivision] = await db
    .update(brandDivisions)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(brandDivisions.id, id))
    .returning();

  return updatedDivision;
}

export async function deleteDivision(id: number) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }

  // Only admins can delete divisions
  if (user.role !== "admin") {
    throw new Error("Permission denied");
  }

  await db.delete(brandDivisions).where(eq(brandDivisions.id, id));
  return { success: true };
}



