// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name || user.email}!
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: 'Total Posts', value: '142', change: '+12%' },
          { label: 'Comments', value: '1,234', change: '+8%' },
          { label: 'Users', value: '89', change: '+3%' },
          { label: 'Divisions', value: '12', change: '+2%' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm text-gold-600 dark:text-gold-400">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two column grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">{user.name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {user.role}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Access Level */}
        <Card>
          <CardHeader>
            <CardTitle>Access Level</CardTitle>
            <CardDescription>What you can do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.role === "admin" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm text-foreground">Full system access</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm text-foreground">User management</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm text-foreground">Content management</p>
                  </div>
                </>
              )}
              {user.role === "editor" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-sm text-foreground">Edit all content</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-sm text-foreground">Publish articles</p>
                  </div>
                </>
              )}
              {user.role === "contributor" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <p className="text-sm text-foreground">Create content</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <p className="text-sm text-foreground">Submit for review</p>
                  </div>
                </>
              )}
              {user.role === "reader" && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  <p className="text-sm text-foreground">View content</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New post published', time: '2 hours ago', user: 'John Doe' },
              { action: 'Comment on "Getting Started"', time: '5 hours ago', user: 'Jane Smith' },
              { action: 'User registered', time: '1 day ago', user: 'Mike Johnson' },
              { action: 'Brand division updated', time: '2 days ago', user: 'Sarah Williams' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}