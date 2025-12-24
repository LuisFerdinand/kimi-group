// app/dashboard/posts/[id]/edit/page.tsx
import { notFound, redirect } from "next/navigation";
import { getCurrentUser, requireContributor } from "@/lib/auth";
import { PostForm } from "@/components/dashboard/post-form";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const user = await requireContributor();
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    redirect("/dashboard/posts");
  }

  // Fetch the post
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, postId));

  if (!post) {
    notFound();
  }

  // Check if user has permission to edit this post
  // Contributors can only edit their own posts
  if (
    user.role === "contributor" && 
    post.authorId !== user.id
  ) {
    redirect("/dashboard/posts");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Edit Post</h1>
        <p className="text-muted-foreground">Update your blog post</p>
      </div>

      <PostForm user={user} post={post} />
    </div>
  );
}