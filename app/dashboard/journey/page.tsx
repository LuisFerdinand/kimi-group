// app/dashboard/journey/page.tsx
import { requireEditor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Clock } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { journeyItems } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";
import { DeleteButton } from "@/components/dashboard/delete-button";
import Image from "next/image";

export default async function JourneyPage() {
  const user = await requireEditor();

  // Fetch all journey items
  const allItems = await db
    .select()
    .from(journeyItems)
    .orderBy(journeyItems.order);

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <DashboardHeader 
          title="Journey"
          description="Manage your company's journey timeline"
          icon={Clock}
        />
        <Link href="/dashboard/journey/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Journey Item
          </Button>
        </Link>
      </div>

      {/* Journey Items Table */}
      <Card className="py-6">
        <CardHeader>
          <CardTitle>All Journey Items</CardTitle>
          <CardDescription>Manage your company&apos;s journey timeline items</CardDescription>
        </CardHeader>
        <CardContent>
          {allItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-foreground mb-2">No journey items yet</h3>
              <p className="text-muted-foreground mb-6">Get started by adding your first journey item</p>
              <Link href="/dashboard/journey/new">
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Add Journey Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Year</th>
                    <th className="text-left py-3 px-4 font-medium">Image</th>
                    <th className="text-left py-3 px-4 font-medium">Title</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                    <th className="text-left py-3 px-4 font-medium">Order</th>
                    <th className="text-left py-3 px-4 font-medium">Created</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{item.year}</td>
                      <td className="py-3 px-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">
                        <span className="line-clamp-2">{item.description}</span>
                      </td>
                      <td className="py-3 px-4">{item.order}</td>
                      <td className="py-3 px-4">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/journey/${item.id}/edit`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          {user.role === "admin" && (
                            <DeleteButton 
                              id={item.id}
                              resourceType="journey"
                              resourceName={item.title}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}