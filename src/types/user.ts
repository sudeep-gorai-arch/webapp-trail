export interface Role {
    id: string;

    name: string;

    description?: string | null;
}

export interface User {
    id: string;

    email: string;

    username: string;

    avatarUrl?: string | null;

    bio?: string | null;

    isPremium: boolean;

    role?: Role | null;

    createdAt?: string;

    updatedAt?: string;
}