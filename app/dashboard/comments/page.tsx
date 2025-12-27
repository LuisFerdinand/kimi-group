/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
// app/dashboard/comments/page.tsx
import { requireEditor } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ExternalLink, Search, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { db } from "@/lib/db";
import { blogComments, blogPosts, users } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import { DeleteCommentButton } from "@/components/dashboard/delete-comment-button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard/dashboard-header"; // Import the new component

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
      parentId: blogComments.parentId,
    })
    .from(blogComments)
    .leftJoin(blogPosts, eq(blogComments.postId, blogPosts.id))
    .leftJoin(users, eq(blogComments.authorId, users.id))
    .orderBy(desc(blogComments.createdAt));

  // Get comment statistics
  const totalComments = comments.length;
  const repliesCount = comments.filter(c => c.parentId !== null).length;
  const topLevelComments = comments.filter(c => c.parentId === null).length;

  // Get recent comments (last 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentComments = comments.filter(c => new Date(c.createdAt) > oneDayAgo).length;

  // Get unique commenters
  const uniqueCommenters = new Set(comments.map(c => c.authorEmail)).size;

  return (
    <div className="mx-auto">
      {/* Header - now using the reusable component */}
      <DashboardHeader 
        title="Comment Management"
        description="Monitor and moderate blog post comments"
        icon={MessageSquare}
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Comments</p>
                <p className="text-2xl font-bold">{totalComments}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Level</p>
                <p className="text-2xl font-bold">{topLevelComments}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <MessageSquare className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Replies</p>
                <p className="text-2xl font-bold">{repliesCount}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <MessageSquare className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last 24h</p>
                <p className="text-2xl font-bold">{recentComments}</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-full">
                <MessageSquare className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search comments..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No comments yet</h3>
                <p className="text-muted-foreground">Comments will appear here once users start engaging with your posts</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Comment Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Author Avatar */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {(comment.authorName || comment.authorEmail || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Comment Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">
                            {comment.authorName || comment.authorEmail || "Anonymous"}
                          </p>
                          {comment.parentId && (
                            <Badge variant="secondary" className="text-xs">
                              Reply
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                          <span>•</span>
                          <Link 
                            href={`/blog/${comment.postSlug}`}
                            className="hover:text-primary transition-colors truncate"
                          >
                            {comment.postTitle}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="pl-13">
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-foreground whitespace-pre-wrap wrap-break-word">
                        {comment.content}
                      </p>
                    </div>
                  </div>

                  {/* Comment Actions */}
                  <div className="pl-13 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${comment.postSlug}`} target="_blank">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Post
                        </Button>
                      </Link>
                    </div>
                    
                    {(user.role === "admin" || user.role === "editor") && (
                      <DeleteCommentButton 
                        commentId={comment.id} 
                        commentPreview={comment.content.substring(0, 100)}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Placeholder */}
      {comments.length > 0 && (
        <div className="mt-8 flex justify-center">
          <p className="text-sm text-muted-foreground">
            Showing {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}