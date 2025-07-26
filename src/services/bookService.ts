import apiClient from "./apiClient"
import type {Book} from "../types/Book.ts";


export const getAllBooks = async (): Promise<Book[]> => {
    const res = await apiClient.get("/books")
    return res.data
}


export const addBook = async (formData: FormData) => {
    const res = await apiClient.post("/books", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return res.data
}


// export const updateBook = async (id: string, bookData: Partial<Book>) => {
//     const res = await apiClient.put(`/books/${id}`, bookData)
//     return res.data
// }

export const updateBook = async (id: string, data: FormData) => {
    const response = await apiClient.put(`/books/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteBook = async (id: string) => {
    await apiClient.delete(`/books/${id}`)
}

export const getFilteredBooks = async (params: { title?: string; author?: string; genre?: string; isbn?: string }) => {
    const res = await apiClient.get<Book[]>("/books/filter", { params });
    return res.data;
};

