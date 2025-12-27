// app/dashboard/users/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";

export default async function UsersPage() {
  const user = await requireAdmin();

  // Fetch all users
  const allUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(users.createdAt);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage system users and permissions</p>
        </div>
        <Link href="/dashboard/users/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New User
          </Button>
        </Link>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage system users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          {allUsers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-foreground mb-2">No users yet</h3>
              <p className="text-muted-foreground mb-6">Get started by creating your first user</p>
              <Link href="/dashboard/users/new">
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Create User
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Role</th>
                    <th className="text-left py-3 px-4 font-medium">Created</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((userItem) => (
                    <tr key={userItem.id} className="border-b">
                      <td className="py-3 px-4">
                        {userItem.name || <span className="text-muted-foreground">No name</span>}
                      </td>
                      <td className="py-3 px-4">{userItem.email}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={userItem.role === "admin" ? "default" : "secondary"}
                          className="capitalize flex items-center gap-1 w-fit"
                        >
                          {userItem.role === "admin" && <Shield className="w-3 h-3" />}
                          {userItem.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {formatDistanceToNow(new Date(userItem.createdAt), { addSuffix: true })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/users/${userItem.id}/edit`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          {userItem.id !== user.id && (
                            <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
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



