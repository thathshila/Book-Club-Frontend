import { useEffect, useState } from "react";
import { getAllBooks, deleteBook, updateBook, getFilteredBooks } from "../services/bookService.ts";
import Swal from "sweetalert2";
import type { Book } from "../types/Book.ts";
import LendBookForm from "../components/LendingForm";
import {
    FiSearch,
    FiEdit,
    FiTrash2,
    FiX,
    FiCheck,
    FiBook,
    FiUser,
    FiCalendar,
    FiTag,
    FiFileText,
    FiPlusCircle,
    FiMinusCircle,
    FiClock,
    FiUserPlus
} from "react-icons/fi";

interface BookListProps {
    refreshFlag: boolean;
}

const BookList = ({ refreshFlag }: BookListProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [showLendForm, setShowLendForm] = useState(false);
    const [selectedBookIsbn, setSelectedBookIsbn] = useState("");
    const [searchParams, setSearchParams] = useState({
        title: "",
        author: "",
        genre: "",
        isbn: ""
    });

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch {
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch books',
                icon: 'error',
                confirmButtonColor: '#4f46e5'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [refreshFlag]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteBook(id);
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'The book has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#4f46e5'
                });
                fetchBooks();
            } catch {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete book',
                    icon: 'error',
                    confirmButtonColor: '#4f46e5'
                });
            }
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editBook) return;

        setEditLoading(true);
        try {
            const data = new FormData();
            data.append("title", editBook.title ?? "");
            data.append("author", editBook.author ?? "");
            data.append("publishedDate", editBook.publishedDate ?? "");
            data.append("genre", editBook.genre ?? "");
            data.append("description", editBook.description ?? "");
            data.append("copiesAvailable", String(editBook.copiesAvailable));

            await updateBook(editBook._id!, data);
            await Swal.fire({
                title: 'Success!',
                text: 'Book updated successfully',
                icon: 'success',
                confirmButtonColor: '#4f46e5'
            });
            setEditBook(null);
            fetchBooks();
        } catch {
            await Swal.fire({
                title: 'Error',
                text: 'Failed to update book',
                icon: 'error',
                confirmButtonColor: '#4f46e5'
            });
        } finally {
            setEditLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const filtered = await getFilteredBooks(searchParams);
            setBooks(filtered);
        } catch {
            await Swal.fire({
                title: 'Error',
                text: 'Failed to search books',
                icon: 'error',
                confirmButtonColor: '#4f46e5'
            });
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = () => {
        setSearchParams({
            title: "",
            author: "",
            genre: "",
            isbn: ""
        });
        fetchBooks();
    };

    const handleLendBook = (book: Book) => {
        if (!book.isbn) {
            Swal.fire({
                title: 'Cannot Lend',
                text: "This book doesn't have an ISBN",
                icon: 'error',
                confirmButtonColor: '#4f46e5'
            });
            return;
        }
        if (book.copiesAvailable <= 0) {
            Swal.fire({
                title: 'No Copies Available',
                text: 'There are no copies available for lending',
                icon: 'warning',
                confirmButtonColor: '#4f46e5'
            });
            return;
        }
        setSelectedBookIsbn(book.isbn);
        setShowLendForm(true);
    };

    if (loading) return (
        <div className="text-center mt-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading books...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FiBook className="mr-2" /> Book Catalog
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {books.length} {books.length === 1 ? 'book' : 'books'} found
                </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiSearch className="mr-2" /> Search Books
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {[
                        { field: "title", icon: <FiBook className="text-gray-400" />, placeholder: "Book title" },
                        { field: "author", icon: <FiUser className="text-gray-400" />, placeholder: "Author name" },
                        { field: "genre", icon: <FiTag className="text-gray-400" />, placeholder: "Genre" },
                        { field: "isbn", icon: <FiFileText className="text-gray-400" />, placeholder: "ISBN" }
                    ].map(({ field, icon, placeholder }) => (
                        <div key={field} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {icon}
                            </div>
                            <input
                                type="text"
                                placeholder={placeholder}
                                value={searchParams[field as keyof typeof searchParams]}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({
                                        ...prev,
                                        [field]: e.target.value
                                    }))
                                }
                                className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        onClick={resetSearch}
                        className="px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <FiX className="mr-2" /> Reset
                    </button>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                        <FiSearch className="mr-2" /> Search
                    </button>
                </div>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <FiBook className="mx-auto text-4xl text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700">No books found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="border rounded-lg p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                                {book.profileImage && (
                                    <div className="w-full md:w-40 lg:w-48 flex-shrink-0">
                                        <img
                                            src={book.profileImage}
                                            alt={book.title}
                                            className="h-48 sm:h-56 w-full object-cover rounded-lg border"
                                        />
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{book.title}</h3>
                                            <p className="text-gray-600 flex items-center mt-1">
                                                <FiUser className="mr-2" /> {book.author}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleLendBook(book)}
                                                disabled={!book.isbn || book.copiesAvailable <= 0}
                                                className={`p-2 rounded-full transition-colors ${
                                                    !book.isbn || book.copiesAvailable <= 0
                                                        ? "text-gray-400 cursor-not-allowed"
                                                        : "text-green-600 hover:text-green-800 hover:bg-green-50"
                                                }`}
                                                title={
                                                    !book.isbn
                                                        ? "No ISBN available"
                                                        : book.copiesAvailable <= 0
                                                            ? "No copies available"
                                                            : "Lend this book"
                                                }
                                            >
                                                <FiUserPlus size={18} />
                                            </button>
                                            <button
                                                onClick={() => setEditBook(book)}
                                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                                title="Edit book"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id!)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                                title="Delete book"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        {book.isbn && (
                                            <div className="flex items-start">
                                                <FiFileText className="mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs sm:text-sm text-gray-500">ISBN</p>
                                                    <p className="text-sm sm:text-base font-medium">{book.isbn}</p>
                                                </div>
                                            </div>
                                        )}
                                        {book.publishedDate && (
                                            <div className="flex items-start">
                                                <FiCalendar className="mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs sm:text-sm text-gray-500">Published Date</p>
                                                    <p className="text-sm sm:text-base font-medium">
                                                        {new Date(book.publishedDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {book.genre && (
                                            <div className="flex items-start">
                                                <FiTag className="mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs sm:text-sm text-gray-500">Genre</p>
                                                    <p className="text-sm sm:text-base font-medium">{book.genre}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-start">
                                            {book.copiesAvailable > 0 ? (
                                                <FiPlusCircle className="mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                                            ) : (
                                                <FiMinusCircle className="mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-500">Copies Available</p>
                                                <p className={`text-sm sm:text-base font-medium ${
                                                    book.copiesAvailable > 0 ? "text-green-600" : "text-red-600"
                                                }`}>
                                                    {book.copiesAvailable}
                                                </p>
                                            </div>
                                        </div>
                                        {book.createdAt && (
                                            <div className="flex items-start">
                                                <FiClock className="mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs sm:text-sm text-gray-500">Added On</p>
                                                    <p className="text-sm sm:text-base font-medium">
                                                        {new Date(book.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {book.description && (
                                        <div className="mt-3 sm:mt-4">
                                            <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                                                <FiFileText className="mr-2" /> Description
                                            </p>
                                            <p className="mt-1 text-sm sm:text-base text-gray-700 line-clamp-3">{book.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <FiEdit className="mr-2" /> Update Book
                            </h2>
                            <button
                                type="button"
                                onClick={() => setEditBook(null)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                                { field: "title", icon: <FiBook />, type: "text", required: true },
                                { field: "author", icon: <FiUser />, type: "text", required: true },
                                { field: "publishedDate", icon: <FiCalendar />, type: "date" },
                                { field: "genre", icon: <FiTag />, type: "text" },
                                { field: "copiesAvailable", icon: <FiPlusCircle />, type: "number", required: true },
                            ].map(({ field, icon, type, required }) => (
                                <div key={field} className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        {icon}
                                        <span className="ml-2 capitalize">{field}</span>
                                    </label>
                                    <input
                                        type={type}
                                        value={editBook[field as keyof Book] as string | number}
                                        onChange={(e) =>
                                            setEditBook({
                                                ...editBook,
                                                [field]: type === "number" ? +e.target.value : e.target.value,
                                            } as Book)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        required={required}
                                        min={type === "number" ? 0 : undefined}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-1 mb-6">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FiFileText />
                                <span className="ml-2">Description</span>
                            </label>
                            <textarea
                                value={editBook.description ?? ""}
                                onChange={(e) =>
                                    setEditBook({
                                        ...editBook,
                                        description: e.target.value,
                                    } as Book)
                                }
                                rows={4}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={() => setEditBook(null)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors"
                            >
                                <FiX className="mr-2" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={editLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center disabled:opacity-70 transition-colors"
                            >
                                {editLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FiCheck className="mr-2" /> Update Book
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showLendForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <LendBookForm
                            onLend={() => {
                                setShowLendForm(false);
                                fetchBooks();
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Book has been lent successfully',
                                    icon: 'success',
                                    confirmButtonColor: '#4f46e5'
                                });
                            }}
                            prefilledIsbn={selectedBookIsbn}
                            onClose={() => setShowLendForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;