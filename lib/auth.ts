// lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { userRoles } from "@/lib/db/schema";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function isAdmin() {
  const session = await getSession();
  return session?.user?.role === userRoles.ADMIN;
}

export async function isEditor() {
  const session = await getSession();
  const role = session?.user?.role;
  return role === userRoles.EDITOR || role === userRoles.ADMIN;
}

export async function isContributor() {
  const session = await getSession();
  const role = session?.user?.role;
  return (
    role === userRoles.CONTRIBUTOR ||
    role === userRoles.EDITOR ||
    role === userRoles.ADMIN
  );
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized: Authentication required");
  }
  return session.user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== userRoles.ADMIN) {
    throw new Error("Unauthorized: Admin access required");
  }
  return user;
}

export async function requireEditor() {
  const user = await requireAuth();
  if (user.role !== userRoles.EDITOR && user.role !== userRoles.ADMIN) {
    throw new Error("Unauthorized: Editor access required");
  }
  return user;
}

export async function requireContributor() {
  const user = await requireAuth();
  if (
    user.role !== userRoles.CONTRIBUTOR &&
    user.role !== userRoles.EDITOR &&
    user.role !== userRoles.ADMIN
  ) {
    throw new Error("Unauthorized: Contributor access required");
  }
  return user;
}

// Helper to check if user has any of the specified roles
export async function hasRole(roles: string[]) {
  const session = await getSession();
  return session?.user?.role ? roles.includes(session.user.role) : false;
}

// Helper for role hierarchy checks
export async function hasMinimumRole(minimumRole: string) {
  const session = await getSession();
  const role = session?.user?.role;
  
  if (!role) return false;
  
  const roleHierarchy = {
    [userRoles.READER]: 0,
    [userRoles.CONTRIBUTOR]: 1,
    [userRoles.EDITOR]: 2,
    [userRoles.ADMIN]: 3,
  };
  
  return roleHierarchy[role as keyof typeof roleHierarchy] >= 
         roleHierarchy[minimumRole as keyof typeof roleHierarchy];
}