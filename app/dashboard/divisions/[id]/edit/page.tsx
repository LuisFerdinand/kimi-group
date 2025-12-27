import { notFound, redirect } from "next/navigation";
import { getCurrentUser, requireEditor } from "@/lib/auth";
import { DivisionForm } from "@/components/dashboard/division-form";
import { db } from "@/lib/db";
import { brandDivisions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Make the component async and properly type the params
export default async function EditDivisionPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params if using Next.js 13.4+ with App Router
  const resolvedParams = await params;
  const user = await requireEditor();
  
  // Check if id exists before parsing
  if (!resolvedParams.id) {
    redirect("/dashboard/divisions");
  }
  
  const divisionId = parseInt(resolvedParams.id);

  if (isNaN(divisionId)) {
    redirect("/dashboard/divisions");
  }

  // Fetch the division
  const [division] = await db
    .select()
    .from(brandDivisions)
    .where(eq(brandDivisions.id, divisionId));

  if (!division) {
    notFound();
  }

  // Check if user has permission to edit this division
  if (
    user.role === "editor" && 
    division.authorId !== user.id
  ) {
    redirect("/dashboard/divisions");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Edit Division</h1>
        <p className="text-muted-foreground">Update brand division information</p>
      </div>

      <DivisionForm user={user} division={division} />
    </div>
  );
}