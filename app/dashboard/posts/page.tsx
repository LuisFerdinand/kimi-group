// app/dashboard/posts/page.tsx
import { requireContributor } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Search,
  Filter,
  Calendar,
  User
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, users } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import DeletePostButton from "@/components/dashboard/posts/DeletePostButton";

export default async function PostsPage() {
  const user = await requireContributor();

  // Fetch all posts with author information and statistics
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      featuredImage: blogPosts.featuredImage,
      featured: blogPosts.featured,
      category: blogPosts.category,
      publishedAt: blogPosts.publishedAt,
      createdAt: blogPosts.createdAt,
      updatedAt: blogPosts.updatedAt,
      views: blogPosts.views,
      likes: blogPosts.likes,
      commentsCount: blogPosts.commentsCount,
      authorId: blogPosts.authorId,
      authorName: users.name,
      authorEmail: users.email,
      authorImage: users.image,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .orderBy(desc(blogPosts.createdAt));

  // Filter posts based on user role
  const filteredPosts = user.role === "contributor" 
    ? posts.filter(post => post.authorId === user.id)
    : posts;

  // Calculate total statistics
  const totalStats = filteredPosts.reduce((acc, post) => ({
    views: acc.views + (post.views || 0),
    likes: acc.likes + (post.likes || 0),
    comments: acc.comments + (post.commentsCount || 0),
    published: acc.published + (post.publishedAt ? 1 : 0),
    drafts: acc.drafts + (post.publishedAt ? 0 : 1),
  }), { views: 0, likes: 0, comments: 0, published: 0, drafts: 0 });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground">Manage and monitor your blog content</p>
        </div>
        <Link href="/dashboard/posts/new">
          <Button className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Posts</p>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                  {filteredPosts.length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Published</p>
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                  {totalStats.published}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Views</p>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                  {totalStats.views.toLocaleString()}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Likes</p>
                <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mt-1">
                  {totalStats.likes.toLocaleString()}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Comments</p>
                <h3 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mt-1">
                  {totalStats.comments.toLocaleString()}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-600 dark:bg-yellow-500 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl">All Posts</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search posts..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get started by creating your first blog post and start sharing your content with the world.
              </p>
              <Link href="/dashboard/posts/new">
                <Button className="flex items-center gap-2 mx-auto bg-yellow-600 hover:bg-yellow-700">
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Eye className="h-4 w-4 inline" />
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Heart className="h-4 w-4 inline" />
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <MessageCircle className="h-4 w-4 inline" />
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600">
                                <TrendingUp className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <Link 
                              href={`/blog/${post.slug}`} 
                              target="_blank"
                              className="font-medium text-foreground hover:text-yellow-600 transition-colors line-clamp-1 block"
                            >
                              {post.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              {post.category && (
                                <Badge variant="outline" className="text-xs">
                                  {post.category}
                                </Badge>
                              )}
                              {post.featured && (
                                <Badge variant="secondary" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {post.authorImage ? (
                            <Image
                              src={post.authorImage}
                              alt={post.authorName || "Author"}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {post.authorName || post.authorEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {post.publishedAt ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-0">
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-400">
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {(post.views || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center text-sm font-semibold text-red-600 dark:text-red-400">
                          {(post.likes || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                          {(post.commentsCount || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" title="View Post">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/posts/${post.id}/edit`}>
                            <Button variant="ghost" size="sm" title="Edit Post">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          {(user.role === "admin" || user.role === "editor" || post.authorId === user.id) && (
                            <DeletePostButton postId={post.id} postTitle={post.title} />
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