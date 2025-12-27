// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPosts, blogComments, users, brandDivisions } from "@/lib/db/schema";
import { count, sql, gte, desc } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Activity = {
  id: string;
  action: string;
  time: string;
  user: string;
  createdAt: Date;
};

// Format time difference
function formatTimeDiff(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Get date for last month comparison
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  // Fetch all data in parallel
  const [
    totalPosts,
    totalComments,
    totalUsers,
    totalDivisions,
    lastMonthPosts,
    lastMonthComments,
    lastMonthUsers,
    lastMonthDivisions,
    recentPosts,
    recentComments,
    recentUsers,
    recentBrands,
  ] = await Promise.all([
    // Current totals
    db.select({ count: count() }).from(blogPosts),
    db.select({ count: count() }).from(blogComments),
    db.select({ count: count() }).from(users),
    db.select({ count: count() }).from(brandDivisions),
    
    // Last month counts for comparison
    db.select({ count: count() })
      .from(blogPosts)
      .where(gte(blogPosts.createdAt, lastMonth)),
    db.select({ count: count() })
      .from(blogComments)
      .where(gte(blogComments.createdAt, lastMonth)),
    db.select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, lastMonth)),
    db.select({ count: count() })
      .from(brandDivisions)
      .where(gte(brandDivisions.createdAt, lastMonth)),

    // Recent activity data
    db.select({
      id: blogPosts.id,
      title: blogPosts.title,
      createdAt: blogPosts.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
      .from(blogPosts)
      .leftJoin(users, sql`${blogPosts.authorId} = ${users.id}`)
      .where(sql`${blogPosts.publishedAt} IS NOT NULL`)
      .orderBy(desc(blogPosts.createdAt))
      .limit(5),

    db.select({
      id: blogComments.id,
      postTitle: blogPosts.title,
      createdAt: blogComments.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
      .from(blogComments)
      .leftJoin(users, sql`${blogComments.authorId} = ${users.id}`)
      .leftJoin(blogPosts, sql`${blogComments.postId} = ${blogPosts.id}`)
      .orderBy(desc(blogComments.createdAt))
      .limit(5),

    db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(5),

    db.select({
      id: brandDivisions.id,
      name: brandDivisions.name,
      createdAt: brandDivisions.updatedAt,
      authorName: users.name,
      authorEmail: users.email,
    })
      .from(brandDivisions)
      .leftJoin(users, sql`${brandDivisions.authorId} = ${users.id}`)
      .orderBy(desc(brandDivisions.updatedAt))
      .limit(5),
  ]);

  // Calculate percentage changes
  const calculateChange = (current: number, lastMonth: number) => {
    if (current === 0) return 0;
    const previous = current - lastMonth;
    if (previous === 0) return 0;
    return Math.round((lastMonth / previous) * 100);
  };

  const statsData = [
    { 
      label: 'Total Posts', 
      value: totalPosts[0].count.toString(), 
      change: calculateChange(totalPosts[0].count, lastMonthPosts[0].count)
    },
    { 
      label: 'Comments', 
      value: totalComments[0].count.toLocaleString(), 
      change: calculateChange(totalComments[0].count, lastMonthComments[0].count)
    },
    { 
      label: 'Users', 
      value: totalUsers[0].count.toString(), 
      change: calculateChange(totalUsers[0].count, lastMonthUsers[0].count)
    },
    { 
      label: 'Divisions', 
      value: totalDivisions[0].count.toString(), 
      change: calculateChange(totalDivisions[0].count, lastMonthDivisions[0].count)
    },
  ];

  // Combine all activities
  const activities: Activity[] = [
    ...recentPosts.map(post => ({
      id: `post-${post.id}`,
      action: `New post published: "${post.title}"`,
      time: formatTimeDiff(post.createdAt),
      user: post.authorName || post.authorEmail || 'Unknown',
      createdAt: post.createdAt,
    })),
    ...recentComments.map(comment => ({
      id: `comment-${comment.id}`,
      action: `Comment on "${comment.postTitle}"`,
      time: formatTimeDiff(comment.createdAt),
      user: comment.authorName || comment.authorEmail || 'Unknown',
      createdAt: comment.createdAt,
    })),
    ...recentUsers.map(u => ({
      id: `user-${u.id}`,
      action: 'User registered',
      time: formatTimeDiff(u.createdAt),
      user: u.name || u.email,
      createdAt: u.createdAt,
    })),
    ...recentBrands.map(brand => ({
      id: `brand-${brand.id}`,
      action: `Brand division updated: "${brand.name}"`,
      time: formatTimeDiff(brand.createdAt),
      user: brand.authorName || brand.authorEmail || 'Unknown',
      createdAt: brand.createdAt,
    })),
  ];

  // Sort by date and limit to 10 most recent
  activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const recentActivity = activities.slice(0, 10);

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name || user.email}!
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className={`text-sm ${
                stat.change > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : stat.change < 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-muted-foreground'
              }`}>
                {stat.change > 0 ? '+' : ''}{stat.change}% from last month
              </p>
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
          {recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No recent activity to display
            </p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}