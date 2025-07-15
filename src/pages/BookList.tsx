// import  { useEffect, useState } from "react"
// import { getAllBooks, deleteBook } from "../services/bookService"
//
// import toast from "react-hot-toast"
// import type {Book} from "../types/Book.ts";
//
// const BookList = ({ refreshFlag }: { refreshFlag: boolean }) => {
//     const [books, setBooks] = useState<Book[]>([])
//     const [loading, setLoading] = useState(false)
//
//     const fetchBooks = async () => {
//         setLoading(true)
//         try {
//             const data = await getAllBooks()
//             setBooks(data)
//         } catch {
//             toast.error("Failed to fetch books")
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     useEffect(() => {
//         fetchBooks()
//     }, [refreshFlag])
//
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this book?")) return
//         try {
//             await deleteBook(id)
//             toast.success("Book deleted")
//             fetchBooks()
//         } catch {
//             toast.error("Failed to delete book")
//         }
//     }
//
//     if (loading) return <div className="text-center mt-10">Loading...</div>
//
//     return (
//         <div className="max-w-4xl mx-auto mt-8">
//             <h2 className="text-xl font-bold mb-4">Book List</h2>
//             {books.length === 0 ? (
//                 <p>No books available.</p>
//             ) : (
//                 <div className="grid gap-4">
//                     {books.map((book) => (
//                         <div key={book._id} className="border rounded p-4 flex items-center justify-between">
//                             <div>
//                                 <h3 className="font-semibold">{book.title} by {book.author}</h3>
//                                 <p>ISBN: {book.isbn}</p>
//                                 <p>Copies Available: {book.copiesAvailable}</p>
//                                 {book.profileImage && <img src={book.profileImage} alt={book.title} className="h-24 mt-2" />}
//                             </div>
//                             <button
//                                 onClick={() => handleDelete(book._id!)}
//                                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }
//
// export default BookList


import { useEffect, useState } from "react";
import { getAllBooks, deleteBook, updateBook } from "../services/bookService";
import toast from "react-hot-toast";
import type { Book } from "../types/Book.ts";

const BookList = ({ refreshFlag }: { refreshFlag: boolean }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [editLoading, setEditLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch {
            toast.error("Failed to fetch books");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [refreshFlag]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return;
        try {
            await deleteBook(id);
            toast.success("Book deleted");
            fetchBooks();
        } catch {
            toast.error("Failed to delete book");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editBook) return;

        setEditLoading(true);
        try {
            const data = new FormData();
            // data.append("title", editBook.title);
            // data.append("author", editBook.author);
            // data.append("publishedDate", editBook.publishedDate);
            // data.append("genre", editBook.genre);
            // data.append("description", editBook.description);
            data.append("copiesAvailable", String(editBook.copiesAvailable));
            data.append("title", editBook.title ?? "");
            data.append("author", editBook.author ?? "");
            data.append("publishedDate", editBook.publishedDate ?? "");
            data.append("genre", editBook.genre ?? "");
            data.append("description", editBook.description ?? "");

            await updateBook(editBook._id!, data);
            toast.success("Book updated successfully");
            setEditBook(null);
            fetchBooks();
        } catch {
            toast.error("Failed to update book");
        } finally {
            setEditLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Book List</h2>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <div className="grid gap-4">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="border rounded p-4 flex items-center justify-between"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {book.title} by {book.author}
                                </h3>
                                <p>ISBN: {book.isbn}</p>
                                <p>Copies Available: {book.copiesAvailable}</p>
                                {book.profileImage && (
                                    <img
                                        src={book.profileImage}
                                        alt={book.title}
                                        className="h-24 mt-2"
                                    />
                                )}
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setEditBook(book)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(book._id!)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {editBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
                    >
                        <h2 className="text-lg font-bold">Update Book</h2>
                        {["title", "author", "publishedDate", "genre", "description", "copiesAvailable"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium capitalize">{field}</label>
                                <input
                                    type={field === "publishedDate" ? "date" : field === "copiesAvailable" ? "number" : "text"}
                                    value={editBook[field as keyof Book] as string | number}
                                    onChange={(e) =>
                                        setEditBook({
                                            ...editBook,
                                            [field]: field === "copiesAvailable" ? +e.target.value : e.target.value,
                                        } as Book)
                                    }
                                    className="border border-gray-300 rounded w-full p-2 mt-1"
                                    required={field !== "description" && field !== "genre"}
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setEditBook(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={editLoading}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                {editLoading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BookList;
