import apiClient from "./apiClient"
import type {Book} from "../types/Book.ts";


// Get all books
export const getAllBooks = async (): Promise<Book[]> => {
    const res = await apiClient.get("/books")
    return res.data
}

// Add a new book (multipart)
export const addBook = async (formData: FormData) => {
    const res = await apiClient.post("/books", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return res.data
}

// Update book (JSON)
export const updateBook = async (id: string, bookData: Partial<Book>) => {
    const res = await apiClient.put(`/books/${id}`, bookData)
    return res.data
}

// Delete book
export const deleteBook = async (id: string) => {
    await apiClient.delete(`/books/${id}`)
}
