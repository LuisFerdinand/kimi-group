// app/api/(public)/blog/[slug]/like/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts, blogPostLikes } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const userId = parseInt(session.user.id);

    // Get post by slug
    const posts = await db
      .select({ id: blogPosts.id, likes: blogPosts.likes })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (posts.length === 0) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const postId = posts[0].id;

    // Check if user already liked this post
    const existingLikes = await db
      .select()
      .from(blogPostLikes)
      .where(
        and(
          eq(blogPostLikes.postId, postId),
          eq(blogPostLikes.userId, userId)
        )
      )
      .limit(1);

    let newLikeCount: number;

    if (existingLikes.length > 0) {
      // Unlike: Remove like and decrement count
      await db
        .delete(blogPostLikes)
        .where(
          and(
            eq(blogPostLikes.postId, postId),
            eq(blogPostLikes.userId, userId)
          )
        );

      const updatedPost = await db
        .update(blogPosts)
        .set({ 
          likes: sql`GREATEST(${blogPosts.likes} - 1, 0)`,
        })
        .where(eq(blogPosts.id, postId))
        .returning({ likes: blogPosts.likes });

      newLikeCount = updatedPost[0]?.likes || 0;

      return NextResponse.json({ 
        liked: false, 
        likes: newLikeCount,
        message: "Post unliked successfully" 
      });
    } else {
      // Like: Add like and increment count
      await db.insert(blogPostLikes).values({
        postId,
        userId,
      });

      const updatedPost = await db
        .update(blogPosts)
        .set({ 
          likes: sql`${blogPosts.likes} + 1`,
        })
        .where(eq(blogPosts.id, postId))
        .returning({ likes: blogPosts.likes });

      newLikeCount = updatedPost[0]?.likes || 0;

      return NextResponse.json({ 
        liked: true, 
        likes: newLikeCount,
        message: "Post liked successfully" 
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to check if user has liked a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ liked: false });
    }

    const { slug } = await params;
    const userId = parseInt(session.user.id);

    // Get post by slug
    const posts = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (posts.length === 0) {
      return NextResponse.json({ liked: false });
    }

    const postId = posts[0].id;

    // Check if user liked this post
    const existingLikes = await db
      .select()
      .from(blogPostLikes)
      .where(
        and(
          eq(blogPostLikes.postId, postId),
          eq(blogPostLikes.userId, userId)
        )
      )
      .limit(1);

    return NextResponse.json({ liked: existingLikes.length > 0 });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json({ liked: false });
  }
}