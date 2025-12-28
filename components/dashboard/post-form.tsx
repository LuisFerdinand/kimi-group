// components/dashboard/post-form.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BlogPost, User } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Loader2, Save, Eye, AlertCircle, Upload, X, Image } from "lucide-react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface PostFormProps {
  user: User;
  post?: BlogPost;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export function PostForm({ user, post }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!post;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  // Image upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    featuredImage: post?.featuredImage || "",
    featured: post?.featured || false,
    category: post?.category || "",
    readTime: post?.readTime || 5,
    published: !!post?.publishedAt || false,
  });

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: isEditing ? prev.slug : generateSlug(value),
    }));
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.");
      return;
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }
    
    setUploadingImage(true);
    setUploadProgress(0);
    setError("");
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blog-featured-images');
    
    try {
      // Create a new XMLHttpRequest to track progress
      const xhr = new XMLHttpRequest();
      
      // Progress tracking
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
      
      // Handle response
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setFormData(prev => ({ ...prev, featuredImage: response.url }));
          setUploadingImage(false);
        } else {
          const error = JSON.parse(xhr.responseText);
          setError(error.error || "Failed to upload image");
          setUploadingImage(false);
        }
      });
      
      // Handle error
      xhr.addEventListener('error', () => {
        setError("Failed to upload image. Please try again.");
        setUploadingImage(false);
      });
      
      // Open and send request
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setUploadingImage(false);
    }
  };
  
  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  
  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  
  // Remove uploaded image
  const removeImage = () => {
    setFormData(prev => ({ ...prev, featuredImage: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/posts/${post.id}` : "/api/posts";
      const method = isEditing ? "PATCH" : "POST";

      const canPublish = user.role === "admin" || user.role === "editor";
      const publishStatus = saveAsDraft ? false : (canPublish ? formData.published : false);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          published: publishStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      router.push("/dashboard/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const canPublish = user.role === "admin" || user.role === "editor";

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <Card className="py-6">
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write your blog post content here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title"
                  required
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="post-url-slug"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL: /blog/{formData.slug || "post-url-slug"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Brief description of your post"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Optional summary shown in post listings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                  placeholder="Write your post content here..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card className="py-6">
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>Configure post metadata and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  {loadingCategories ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading categories...
                    </div>
                  ) : (
                    <Select
                      value={formData.category || "none"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value === "none" ? "" : value })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    min="1"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Featured Image</Label>
                {formData.featuredImage ? (
                  <div className="relative">
                    <div className="mt-2 border rounded-lg overflow-hidden">
                      <img
                        src={formData.featuredImage}
                        alt="Featured preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/800x400?text=Invalid+Image";
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {uploadingImage ? (
                      <div className="space-y-2">
                        <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Uploading image...</p>
                        <Progress value={uploadProgress} className="w-full" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Image className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF, WebP up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured Post</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this post prominently on the blog
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked })
                    }
                  />
                </div>

                {canPublish && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="published">Publish Post</Label>
                      <p className="text-sm text-muted-foreground">
                        Make this post visible to readers
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, published: checked })
                      }
                    />
                  </div>
                )}

                {!canPublish && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Contributors can create drafts. An editor or admin must publish your post.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6 mt-6">
          <Card className="py-6">
            <CardHeader>
              <CardTitle>Post Preview</CardTitle>
              <CardDescription>See how your post will appear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.featuredImage && (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={formData.featuredImage}
                    alt={formData.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  {formData.title || "Untitled Post"}
                </h1>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {formData.category && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {categories.find(c => c.slug === formData.category)?.name || formData.category}
                    </span>
                  )}
                  <span>{formData.readTime} min read</span>
                </div>

                {formData.excerpt && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {formData.excerpt}
                  </p>
                )}
              </div>

              <div className="border-t pt-6">
                <div 
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ 
                    __html: formData.content || "<p class='text-muted-foreground'>No content yet...</p>" 
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between gap-4 pt-6 border-t sticky bottom-0 bg-background pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/posts")}
          disabled={loading}
        >
          Cancel
        </Button>

        <div className="flex gap-2">
          {canPublish && (
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </>
              )}
            </Button>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                {canPublish ? (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    {formData.published ? "Update & Publish" : "Update"}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update Draft" : "Save Draft"}
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}