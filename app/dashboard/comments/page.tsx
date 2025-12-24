// app/dashboard/comments/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser, requireEditor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { db } from "@/lib/db";
import { blogComments, blogPosts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function CommentsPage() {
  const user = await requireEditor();

  // Fetch all comments with post and author information
  const comments = await db
    .select({
      id: blogComments.id,
      content: blogComments.content,
      createdAt: blogComments.createdAt,
      postId: blogComments.postId,
      postTitle: blogPosts.title,
      postSlug: blogPosts.slug,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(blogComments)
    .leftJoin(blogPosts, eq(blogComments.postId, blogPosts.id))
    .leftJoin(users, eq(blogComments.authorId, users.id))
    .orderBy(blogComments.createdAt);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Comments</h1>
        <p className="text-muted-foreground">Manage blog post comments</p>
      </div>

      {/* Comments List */}
      <div className="grid gap-6">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-foreground mb-2">No comments yet</h3>
                <p className="text-muted-foreground">Comments will appear here once users start engaging with your posts</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Comment on "{comment.postTitle}"</CardTitle>
                    <CardDescription className="mt-1">
                      By {comment.authorName || comment.authorEmail} •{" "}
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Blog Post</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{comment.content}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Reply className="w-4 h-4" />
                      Reply
                    </Button>
                    {user.role === "admin" && (
                      <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    View Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}