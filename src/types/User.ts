export interface User {
    name: string;
    email: string;
    password?: string;
    role?: "staff" | "librarian"
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    profileImage?: string;
    isActive?: boolean;
    createdAt?: string;
    memberCode?: string;
    nic?: string;
}