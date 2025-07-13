import  { useEffect, useState } from "react"
import { getAllBooks, deleteBook } from "../services/bookService"

import toast from "react-hot-toast"
import type {Book} from "../types/Book.ts";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)

    const fetchBooks = async () => {
        setLoading(true)
        try {
            const data = await getAllBooks()
            setBooks(data)
        } catch {
            toast.error("Failed to fetch books")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return
        try {
            await deleteBook(id)
            toast.success("Book deleted")
            fetchBooks()
        } catch {
            toast.error("Failed to delete book")
        }
    }

    if (loading) return <div className="text-center mt-10">Loading...</div>

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Book List</h2>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <div className="grid gap-4">
                    {books.map((book) => (
                        <div key={book._id} className="border rounded p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">{book.title} by {book.author}</h3>
                                <p>ISBN: {book.isbn}</p>
                                <p>Copies Available: {book.copiesAvailable}</p>
                                {book.profileImage && <img src={book.profileImage} alt={book.title} className="h-24 mt-2" />}
                            </div>
                            <button
                                onClick={() => handleDelete(book._id!)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookList
