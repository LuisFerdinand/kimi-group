// app/dashboard/clients/page.tsx
import { requireEditor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Users } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";
import { DeleteButton } from "@/components/dashboard/delete-button";
import Image from "next/image";

export default async function ClientsPage() {
  const user = await requireEditor();

  // Fetch all clients
  const allClients = await db
    .select()
    .from(clients)
    .orderBy(clients.order);

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <DashboardHeader 
          title="Clients"
          description="Manage client logos and information"
          icon={Users}
        />
        <Link href="/dashboard/clients/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Client
          </Button>
        </Link>
      </div>

      {/* Clients Table */}
      <Card className="py-6">
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>Manage your client logos and information</CardDescription>
        </CardHeader>
        <CardContent>
          {allClients.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-foreground mb-2">No clients yet</h3>
              <p className="text-muted-foreground mb-6">Get started by adding your first client</p>
              <Link href="/dashboard/clients/new">
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Add Client
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Logo</th>
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Order</th>
                    <th className="text-left py-3 px-4 font-medium">Created</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allClients.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={client.logoUrl}
                            alt={client.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{client.name}</td>
                      <td className="py-3 px-4">{client.order}</td>
                      <td className="py-3 px-4">
                        {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/clients/${client.id}/edit`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          {user.role === "admin" && (
                            <DeleteButton 
                              id={client.id}
                              resourceType="client"
                              resourceName={client.name}
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