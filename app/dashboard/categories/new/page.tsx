// app/dashboard/categories/new/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser, requireEditor } from "@/lib/auth";
import { CategoryForm } from "@/components/dashboard/category-form";

export default async function NewCategoryPage() {
  const user = await requireEditor();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Category</h1>
        <p className="text-muted-foreground">Add a new blog post category</p>
      </div>

      <CategoryForm user={user} />
    </div>
  );
}

// app/dashboard/categories/[id]/edit/page.tsx
import { notFound, redirect } from "next/navigation";
import { getCurrentUser, requireEditor } from "@/lib/auth";
import { CategoryForm } from "@/components/dashboard/category-form";
import { db } from "@/lib/db";
import { blogCategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const user = await requireEditor();
  const categoryId = parseInt(params.id);

  if (isNaN(categoryId)) {
    redirect("/dashboard/categories");
  }

  // Fetch the category
  const [category] = await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.id, categoryId));

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Edit Category</h1>
        <p className="text-muted-foreground">Update category information</p>
      </div>

      <CategoryForm user={user} category={category} />
    </div>
  );
}