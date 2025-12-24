// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/api/posts";
import { requireContributor } from "@/lib/auth";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireContributor();
    const data = await request.json();
    const post = await createPost(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create post" },
      { status: 500 }
    );
  }
}