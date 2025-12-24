// components/dashboard/division-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, BrandDivision } from "@/lib/db/schema";
import { createDivision, updateDivision } from "@/lib/api/divisions";
import { toast } from "sonner";

interface DivisionFormProps {
  user: User;
  division?: BrandDivision;
}

export function DivisionForm({ user, division }: DivisionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: division?.name || "",
    slug: division?.slug || "",
    tagline: division?.tagline || "",
    description: division?.description || "",
    backgroundImage: division?.backgroundImage || "",
    logo: division?.logo || "",
    color: division?.color || "#3b82f6",
    featured: division?.featured || false,
    stats: division?.stats || {},
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (division) {
        await updateDivision(division.id, formData);
        toast.success("Division updated successfully");
      } else {
        await createDivision(formData);
        toast.success("Division created successfully");
      }
      router.push("/dashboard/divisions");
    } catch (error) {
      console.error("Error saving division:", error);
      toast.error("Failed to save division");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the basic details for your brand division</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter division name"
              required
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="division-url-slug"
              required
            />
          </div>
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              placeholder="Brief tagline for the division"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed description of the division"
              rows={5}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Visual Assets</CardTitle>
          <CardDescription>Upload images and set colors for your division</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <Label htmlFor="backgroundImage">Background Image URL</Label>
            <Input
              id="backgroundImage"
              name="backgroundImage"
              value={formData.backgroundImage}
              onChange={handleInputChange}
              placeholder="https://example.com/background.jpg"
            />
          </div>
          <div>
            <Label htmlFor="color">Brand Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure additional settings for your division</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleSwitchChange(checked, "featured")}
            />
            <Label htmlFor="featured">Featured Division</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : division ? "Update Division" : "Create Division"}
        </Button>
      </div>
    </form>
  );
}
