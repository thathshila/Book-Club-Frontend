import apiClient from "./apiClient"
import type { User } from "../types/User"

export interface SignUpResponse {
    _id: string
    name: string
    email: string
    role: "staff" | "librarian"
    phone: string
    address: string
    dateOfBirth: string
    profileImage: string
    isActive: boolean
    createdAt: string
    memberCode?: string
    nic?: string
}

export interface LoginResponse {
    _id: string
    name: string
    email: string
    role: "staff" | "librarian"
    accessToken: string
}

export interface LogoutResponse {
    message: string
}

export const signUp = async (formData: FormData): Promise<SignUpResponse> => {
    const response = await apiClient.post("/auth/signup", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}


export const login = async (
    loginData: Pick<User, "email" | "password">
): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", loginData)
    return response.data
}

export const logout = async (): Promise<LogoutResponse> => {
    const response = await apiClient.post("/auth/logout")
    return response.data
}

export const getAllStaff = async (): Promise<User[]> => {
    const response = await apiClient.get("/auth/staff");
    return response.data;
};

export const deleteStaff = async (id: string): Promise<void> => {
    await apiClient.delete(`/auth/${id}`);
};

export const updateStaff = async (id: string, formData: FormData): Promise<User> => {
    const response = await apiClient.put(`/auth/update/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const sendOtp = async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
};

export const verifyOtp = async (
    email: string,
    otp: string
): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/verify-otp", { email, otp });
    return response.data;
};

export const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string
): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
    });
    return response.data;
};

export const getLoggedInUser = async (): Promise<User> => {
    const response = await apiClient.get("/auth/get");
    return response.data.user; // ✅ Fix here
};
