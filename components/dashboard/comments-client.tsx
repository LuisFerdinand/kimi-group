/* eslint-disable react-hooks/purity */
// components/dashboard/comments-client.tsx
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, ExternalLink, Search, Filter, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { DeleteCommentButton } from "@/components/dashboard/delete-comment-button";
import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  postTitle: string | null;
  postSlug: string | null;
  authorName: string | null;
  authorEmail: string | null;
  parentId: number | null;
};

type CommentsClientProps = {
  comments: Comment[];
  userRole: string;
};

type FilterType = "all" | "top-level" | "replies";
type SortType = "newest" | "oldest";

export function CommentsClient({ comments, userRole }: CommentsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("newest");
  const [selectedPost, setSelectedPost] = useState<string>("all");

  // Get unique posts for filter dropdown
  const uniquePosts = useMemo(() => {
    const posts = new Map<string, string>();
    comments.forEach((comment) => {
      if (comment.postSlug && comment.postTitle) {
        posts.set(comment.postSlug, comment.postTitle);
      }
    });
    return Array.from(posts.entries());
  }, [comments]);

  // Filter and sort comments
  const filteredComments = useMemo(() => {
    let filtered = [...comments];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (comment) =>
          comment.content.toLowerCase().includes(query) ||
          comment.authorName?.toLowerCase().includes(query) ||
          comment.authorEmail?.toLowerCase().includes(query) ||
          comment.postTitle?.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filterType === "top-level") {
      filtered = filtered.filter((comment) => comment.parentId === null);
    } else if (filterType === "replies") {
      filtered = filtered.filter((comment) => comment.parentId !== null);
    }

    // Apply post filter
    if (selectedPost !== "all") {
      filtered = filtered.filter((comment) => comment.postSlug === selectedPost);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortType === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [comments, searchQuery, filterType, selectedPost, sortType]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalComments = comments.length;
    const topLevelComments = comments.filter((c) => c.parentId === null).length;
    const repliesCount = comments.filter((c) => c.parentId !== null).length;
    
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentComments = comments.filter(
      (c) => new Date(c.createdAt) > oneDayAgo
    ).length;

    return {
      total: totalComments,
      topLevel: topLevelComments,
      replies: repliesCount,
      recent: recentComments,
    };
  }, [comments]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setSelectedPost("all");
    setSortType("newest");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterType !== "all" ||
    selectedPost !== "all" ||
    sortType !== "newest";

  return (
    <div className="mx-auto">
      {/* Header */}
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
                <p className="text-2xl font-bold">{stats.total}</p>
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
                <p className="text-2xl font-bold">{stats.topLevel}</p>
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
                <p className="text-2xl font-bold">{stats.replies}</p>
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
                <p className="text-2xl font-bold">{stats.recent}</p>
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
          <div className="space-y-4">
            {/* Search and Quick Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search comments, authors, or posts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Type */}
              <Select value={filterType} onValueChange={(value: FilterType) => setFilterType(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Comments</SelectItem>
                  <SelectItem value="top-level">Top Level Only</SelectItem>
                  <SelectItem value="replies">Replies Only</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortType} onValueChange={(value: SortType) => setSortType(value)}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Post Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedPost} onValueChange={setSelectedPost}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Filter by post" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  {uniquePosts.map(([slug, title]) => (
                    <SelectItem key={slug} value={slug}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: &quot;{searchQuery}&quot;
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
                {filterType !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Type: {filterType === "top-level" ? "Top Level" : "Replies"}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setFilterType("all")}
                    />
                  </Badge>
                )}
                {selectedPost !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Post: {uniquePosts.find(([slug]) => slug === selectedPost)?.[1]}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedPost("all")}
                    />
                  </Badge>
                )}
                {sortType !== "newest" && (
                  <Badge variant="secondary" className="gap-1">
                    Sort: Oldest First
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSortType("newest")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {hasActiveFilters && (
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredComments.length} of {comments.length} comment
          {filteredComments.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {comments.length === 0 ? "No comments yet" : "No comments found"}
                </h3>
                <p className="text-muted-foreground">
                  {comments.length === 0
                    ? "Comments will appear here once users start engaging with your posts"
                    : "Try adjusting your filters to see more results"}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredComments.map((comment) => (
            <Card key={comment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Comment Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Author Avatar */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {(comment.authorName || comment.authorEmail || "U")
                            .charAt(0)
                            .toUpperCase()}
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
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
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
                      <p className="text-foreground whitespace-pre-wrap break-words">
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

                    {(userRole === "admin" || userRole === "editor") && (
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

      {/* Pagination Info */}
      {filteredComments.length > 0 && (
        <div className="mt-8 flex justify-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredComments.length} comment
            {filteredComments.length !== 1 ? "s" : ""}
            {hasActiveFilters && ` (filtered from ${comments.length} total)`}
          </p>
        </div>
      )}
    </div>
  );
}