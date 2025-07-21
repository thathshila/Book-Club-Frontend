
import apiClient from "./apiClient";
import type { Lending } from "../types/Lending";


// Lend a book
export const lendBook = async (payload: {
    memberId: string;
    isbn: string;
    dueDate: string;
}): Promise<Lending> => {
    const res = await apiClient.post("/lendings", payload);
    return res.data.lending;
};


// Get all lendings (with optional filters)
export const getLendings = async (
    params?: { bookId?: string; readerId?: string }
): Promise<Lending[]> => {
    const res = await apiClient.get("/lendings", { params });
    return res.data; // backend returns array directly
};

// Return a book
export const returnBook = async (id: string): Promise<Lending> => {
    const res = await apiClient.put(`/lendings/${id}/return`);
    return res.data.lending;
};


export const sendOverdueNotifications = async () => {
    const response = await apiClient.post("/notifications/send-overdue-notifications");
    return response.data;
};