// app/dashboard/divisions/new/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser, requireEditor } from "@/lib/auth";
import { DivisionForm } from "@/components/dashboard/division-form";

export default async function NewDivisionPage() {
  const user = await requireEditor();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Division</h1>
        <p className="text-muted-foreground">Add a new brand division</p>
      </div>

      <DivisionForm user={user} />
    </div>
  );
}