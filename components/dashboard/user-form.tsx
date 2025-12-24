// components/dashboard/user-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/lib/db/schema";
import { createUser, updateUser } from "@/lib/api/users";
import { toast } from "sonner";

interface UserFormProps {
  user: User;
  userToEdit?: User;
}

export function UserForm({ user, userToEdit }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: userToEdit?.name || "",
    email: userToEdit?.email || "",
    password: "",
    role: userToEdit?.role || "reader",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (userToEdit) {
        await updateUser(userToEdit.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          // Only include password if it's provided
          ...(formData.password && { password: formData.password }),
        });
        toast.success("User updated successfully");
      } else {
        await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        toast.success("User created successfully");
      }
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            {userToEdit ? "Update the user's information" : "Enter the details for the new user"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter user's name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter user's email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">
              {userToEdit ? "New Password (leave blank to keep current)" : "Password"}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={userToEdit ? "Enter new password" : "Enter password"}
              required={!userToEdit}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reader">Reader</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
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
          {isSubmitting ? "Saving..." : userToEdit ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}