import type { User } from "../db/schema.ts";

export type PublicUser = {
    id: string;
    name: string;
    username: string;
    email: string | null;
    role: string;
    avatarUrl: string | null;
    bio: string;
    country: string;
    githubUrl: string;
    createdAt: Date | null;
};

export function toPublicUser(user: typeof User.$inferSelect): PublicUser {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        bio: user.bio ?? "",
        country: user.country ?? "",
        githubUrl: user.githubUrl ?? "",
        createdAt: user.createdAt,
    };
}
