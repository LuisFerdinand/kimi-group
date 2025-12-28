// app/dashboard/achievements/page.tsx
import { requireEditor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Award } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { achievements } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";
import { DeleteButton } from "@/components/dashboard/delete-button";

export default async function AchievementsPage() {
  const user = await requireEditor();

  // Fetch all achievements
  const allAchievements = await db
    .select()
    .from(achievements)
    .orderBy(achievements.order);

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <DashboardHeader 
          title="Achievements"
          description="Manage company achievements and milestones"
          icon={Award}
        />
        <Link href="/dashboard/achievements/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Achievement
          </Button>
        </Link>
      </div>

      {/* Achievements Table */}
      <Card className="py-6">
        <CardHeader>
          <CardTitle>All Achievements</CardTitle>
          <CardDescription>Manage your company achievements and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          {allAchievements.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-foreground mb-2">No achievements yet</h3>
              <p className="text-muted-foreground mb-6">Get started by adding your first achievement</p>
              <Link href="/dashboard/achievements/new">
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Title</th>
                    <th className="text-left py-3 px-4 font-medium">Icon</th>
                    <th className="text-left py-3 px-4 font-medium">Featured</th>
                    <th className="text-left py-3 px-4 font-medium">Order</th>
                    <th className="text-left py-3 px-4 font-medium">Created</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allAchievements.map((achievement) => (
                    <tr key={achievement.id} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{achievement.title}</div>
                          {achievement.description && (
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {achievement.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">{achievement.icon || "-"}</td>
                      <td className="py-3 px-4">
                        {achievement.featured ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{achievement.order}</td>
                      <td className="py-3 px-4">
                        {formatDistanceToNow(new Date(achievement.createdAt), { addSuffix: true })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/achievements/${achievement.id}/edit`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          {user.role === "admin" && (
                            <DeleteButton 
                              id={achievement.id}
                              resourceType="achievement"
                              resourceName={achievement.title}
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