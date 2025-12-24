// lib/api/users.ts
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function getUsers() {
  return await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    createdAt: users.createdAt,
  }).from(users);
}

export async function getUser(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function createUser(data: {
  name?: string;
  email: string;
  password: string;
  role: string;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Authentication required");
  }

  // Only admins can create users
  if (currentUser.role !== "admin") {
    throw new Error("Permission denied");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

  return newUser;
}

export async function updateUser(
  id: number,
  data: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Authentication required");
  }

  // Only admins can update other users
  if (currentUser.role !== "admin" && currentUser.id !== id) {
    throw new Error("Permission denied");
  }

  // Prepare update data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = {
    ...data,
    updatedAt: new Date(),
  };

  // Hash the password if provided
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  // Users can't change their own role
  if (currentUser.id === id) {
    delete updateData.role;
  }

  const [updatedUser] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

  return updatedUser;
}

export async function deleteUser(id: number) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Authentication required");
  }

  // Only admins can delete users
  if (currentUser.role !== "admin") {
    throw new Error("Permission denied");
  }

  // Users can't delete themselves
  if (currentUser.id === id) {
    throw new Error("Cannot delete your own account");
  }

  await db.delete(users).where(eq(users.id, id));
  return { success: true };
}