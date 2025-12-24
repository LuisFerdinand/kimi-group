// app/dashboard/divisions/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser, requireEditor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { brandDivisions, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";

export default async function DivisionsPage() {
  const user = await requireEditor();

  // Fetch all brand divisions with author information
  const divisions = await db
    .select({
      id: brandDivisions.id,
      name: brandDivisions.name,
      slug: brandDivisions.slug,
      tagline: brandDivisions.tagline,
      featured: brandDivisions.featured,
      createdAt: brandDivisions.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(brandDivisions)
    .leftJoin(users, eq(brandDivisions.authorId, users.id))
    .orderBy(brandDivisions.createdAt);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Brand Divisions</h1>
          <p className="text-muted-foreground">Manage your brand divisions</p>
        </div>
        <Link href="/dashboard/divisions/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Division
          </Button>
        </Link>
      </div>

      {/* Divisions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {divisions.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-foreground mb-2">No divisions yet</h3>
                <p className="text-muted-foreground mb-6">Get started by creating your first brand division</p>
                <Link href="/dashboard/divisions/new">
                  <Button className="flex items-center gap-2 mx-auto">
                    <Plus className="w-4 h-4" />
                    Create Division
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          divisions.map((division) => (
            <Card key={division.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{division.name}</CardTitle>
                  {division.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                {division.tagline && (
                  <CardDescription>{division.tagline}</CardDescription>
                )}
                <CardDescription>
                  By {division.authorName || division.authorEmail} •{" "}
                  {formatDistanceToNow(new Date(division.createdAt), { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Link href={`/divisions/${division.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/divisions/${division.id}/edit`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    {user.role === "admin" && (
                      <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}



