export interface User {

    id: string;

    email: string;

    username: string;

    avatarUrl?: string | null;


    role?: {

        id: string;

        name: string;

        description?: string | null;

    } | null;


}