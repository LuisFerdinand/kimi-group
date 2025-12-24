// app/dashboard/posts/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser, requireContributor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";

export default async function PostsPage() {
  const user = await requireContributor();

  // Fetch all posts with author information
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      featured: blogPosts.featured,
      publishedAt: blogPosts.publishedAt,
      createdAt: blogPosts.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .orderBy(blogPosts.createdAt);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Link href="/dashboard/posts/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6">Get started by creating your first blog post</p>
                <Link href="/dashboard/posts/new">
                  <Button className="flex items-center gap-2 mx-auto">
                    <Plus className="w-4 h-4" />
                    Create Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="mt-1">
                      By {post.authorName || post.authorEmail} •{" "}
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.featured && <Badge variant="secondary">Featured</Badge>}
                    {post.publishedAt ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt || "No excerpt provided"}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/posts/${post.id}/edit`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    {(user.role === "admin" || user.role === "editor") && (
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



