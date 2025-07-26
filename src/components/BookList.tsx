// //
// //
// // import { useEffect, useState } from "react";
// // import { getAllBooks, deleteBook, updateBook } from "../services/bookService.ts";
// // import toast from "react-hot-toast";
// // import type { Book } from "../types/Book.ts";
// //
// // const BookList = ({ refreshFlag }: { refreshFlag: boolean }) => {
// //     const [books, setBooks] = useState<Book[]>([]);
// //     const [loading, setLoading] = useState(false);
// //     const [editBook, setEditBook] = useState<Book | null>(null);
// //     const [editLoading, setEditLoading] = useState(false);
// //
// //     const fetchBooks = async () => {
// //         setLoading(true);
// //         try {
// //             const data = await getAllBooks();
// //             setBooks(data);
// //         } catch {
// //             toast.error("Failed to fetch books");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     useEffect(() => {
// //         fetchBooks();
// //     }, [refreshFlag]);
// //
// //     const handleDelete = async (id: string) => {
// //         if (!confirm("Are you sure you want to delete this book?")) return;
// //         try {
// //             await deleteBook(id);
// //             toast.success("Book deleted");
// //             fetchBooks();
// //         } catch {
// //             toast.error("Failed to delete book");
// //         }
// //     };
// //
// //     const handleUpdate = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editBook) return;
// //
// //         setEditLoading(true);
// //         try {
// //             const data = new FormData();
// //             // data.append("title", editBook.title);
// //             // data.append("author", editBook.author);
// //             // data.append("publishedDate", editBook.publishedDate);
// //             // data.append("genre", editBook.genre);
// //             // data.append("description", editBook.description);
// //             data.append("copiesAvailable", String(editBook.copiesAvailable));
// //             data.append("title", editBook.title ?? "");
// //             data.append("author", editBook.author ?? "");
// //             data.append("publishedDate", editBook.publishedDate ?? "");
// //             data.append("genre", editBook.genre ?? "");
// //             data.append("description", editBook.description ?? "");
// //
// //             await updateBook(editBook._id!, data);
// //             toast.success("Book updated successfully");
// //             setEditBook(null);
// //             fetchBooks();
// //         } catch {
// //             toast.error("Failed to update book");
// //         } finally {
// //             setEditLoading(false);
// //         }
// //     };
// //
// //     if (loading) return <div className="text-center mt-10">Loading...</div>;
// //
// //     return (
// //         <div className="max-w-4xl mx-auto mt-8">
// //             <h2 className="text-xl font-bold mb-4">Book List</h2>
// //             {books.length === 0 ? (
// //                 <p>No books available.</p>
// //             ) : (
// //                 <div className="grid gap-4">
// //                     {books.map((book) => (
// //                         <div
// //                             key={book._id}
// //                             className="border rounded p-4 flex items-center justify-between"
// //                         >
// //                             <div>
// //                                 <h3 className="font-semibold">
// //                                     {book.title} by {book.author}
// //                                 </h3>
// //                                 <p>ISBN: {book.isbn}</p>
// //                                 <p>Copies Available: {book.copiesAvailable}</p>
// //                                 {book.profileImage && (
// //                                     <img
// //                                         src={book.profileImage}
// //                                         alt={book.title}
// //                                         className="h-24 mt-2"
// //                                     />
// //                                 )}
// //                             </div>
// //                             <div className="space-x-2">
// //                                 <button
// //                                     onClick={() => setEditBook(book)}
// //                                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
// //                                 >
// //                                     Update
// //                                 </button>
// //                                 <button
// //                                     onClick={() => handleDelete(book._id!)}
// //                                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //
// //             {/* Update Modal */}
// //             {editBook && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <form
// //                         onSubmit={handleUpdate}
// //                         className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
// //                     >
// //                         <h2 className="text-lg font-bold">Update Book</h2>
// //                         {["title", "author", "publishedDate", "genre", "description", "copiesAvailable"].map((field) => (
// //                             <div key={field}>
// //                                 <label className="block text-sm font-medium capitalize">{field}</label>
// //                                 <input
// //                                     type={field === "publishedDate" ? "date" : field === "copiesAvailable" ? "number" : "text"}
// //                                     value={editBook[field as keyof Book] as string | number}
// //                                     onChange={(e) =>
// //                                         setEditBook({
// //                                             ...editBook,
// //                                             [field]: field === "copiesAvailable" ? +e.target.value : e.target.value,
// //                                         } as Book)
// //                                     }
// //                                     className="border border-gray-300 rounded w-full p-2 mt-1"
// //                                     required={field !== "description" && field !== "genre"}
// //                                 />
// //                             </div>
// //                         ))}
// //                         <div className="flex justify-end space-x-2">
// //                             <button
// //                                 type="button"
// //                                 onClick={() => setEditBook(null)}
// //                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
// //                             >
// //                                 Cancel
// //                             </button>
// //                             <button
// //                                 type="submit"
// //                                 disabled={editLoading}
// //                                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// //                             >
// //                                 {editLoading ? "Updating..." : "Update"}
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };
// //
// // export default BookList;
// import { useEffect, useState } from "react";
// import { getAllBooks, deleteBook, updateBook, getFilteredBooks } from "../services/bookService.ts";
// import toast from "react-hot-toast";
// import type { Book } from "../types/Book.ts";
//
// const BookList = ({ refreshFlag }: { refreshFlag: boolean }) => {
//     const [books, setBooks] = useState<Book[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [editBook, setEditBook] = useState<Book | null>(null);
//     const [editLoading, setEditLoading] = useState(false);
//
//     const [searchParams, setSearchParams] = useState({
//         title: "",
//         author: "",
//         genre: "",
//         isbn: ""
//     });
//
//     const fetchBooks = async () => {
//         setLoading(true);
//         try {
//             const data = await getAllBooks();
//             setBooks(data);
//         } catch {
//             toast.error("Failed to fetch books");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchBooks();
//     }, [refreshFlag]);
//
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this book?")) return;
//         try {
//             await deleteBook(id);
//             toast.success("Book deleted");
//             fetchBooks();
//         } catch {
//             toast.error("Failed to delete book");
//         }
//     };
//
//     const handleUpdate = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editBook) return;
//
//         setEditLoading(true);
//         try {
//             const data = new FormData();
//             data.append("title", editBook.title ?? "");
//             data.append("author", editBook.author ?? "");
//             data.append("publishedDate", editBook.publishedDate ?? "");
//             data.append("genre", editBook.genre ?? "");
//             data.append("description", editBook.description ?? "");
//             data.append("copiesAvailable", String(editBook.copiesAvailable));
//
//             await updateBook(editBook._id!, data);
//             toast.success("Book updated successfully");
//             setEditBook(null);
//             fetchBooks();
//         } catch {
//             toast.error("Failed to update book");
//         } finally {
//             setEditLoading(false);
//         }
//     };
//
//     const handleSearch = async () => {
//         setLoading(true);
//         try {
//             const filtered = await getFilteredBooks(searchParams);
//             setBooks(filtered);
//         } catch {
//             toast.error("Failed to search books");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     if (loading) return <div className="text-center mt-10">Loading...</div>;
//
//     return (
//         <div className="max-w-4xl mx-auto mt-8 space-y-6">
//             <h2 className="text-xl font-bold mb-2">Book List</h2>
//
//             {/* Search Filters */}
//             <div className="bg-white p-4 rounded shadow space-y-2">
//                 <h3 className="text-lg font-semibold">Search Books</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
//                     {["title", "author", "genre", "isbn"].map((field) => (
//                         <input
//                             key={field}
//                             type="text"
//                             placeholder={`Search by ${field}`}
//                             value={searchParams[field as keyof typeof searchParams]}
//                             onChange={(e) =>
//                                 setSearchParams((prev) => ({
//                                     ...prev,
//                                     [field]: e.target.value
//                                 }))
//                             }
//                             className="border border-gray-300 rounded p-2"
//                         />
//                     ))}
//                 </div>
//                 <button
//                     onClick={handleSearch}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//                 >
//                     Search
//                 </button>
//             </div>
//
//             {books.length === 0 ? (
//                 <p>No books available.</p>
//             ) : (
//                 <div className="grid gap-4">
//                     {/*{books.map((book) => (*/}
//                     {/*    <div*/}
//                     {/*        key={book._id}*/}
//                     {/*        className="border rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"*/}
//                     {/*    >*/}
//                     {/*        <div>*/}
//                     {/*            <h3 className="font-semibold">{book.title} by {book.author}</h3>*/}
//                     {/*            <p>ISBN: {book.isbn}</p>*/}
//                     {/*            <p>Copies Available: {book.copiesAvailable}</p>*/}
//                     {/*            {book.profileImage && (*/}
//                     {/*                <img*/}
//                     {/*                    src={book.profileImage}*/}
//                     {/*                    alt={book.title}*/}
//                     {/*                    className="h-24 mt-2"*/}
//                     {/*                />*/}
//                     {/*            )}*/}
//                     {/*        </div>*/}
//                     {/*        <div className="space-x-2">*/}
//                     {/*            <button*/}
//                     {/*                onClick={() => setEditBook(book)}*/}
//                     {/*                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"*/}
//                     {/*            >*/}
//                     {/*                Update*/}
//                     {/*            </button>*/}
//                     {/*            <button*/}
//                     {/*                onClick={() => handleDelete(book._id!)}*/}
//                     {/*                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"*/}
//                     {/*            >*/}
//                     {/*                Delete*/}
//                     {/*            </button>*/}
//                     {/*        </div>*/}
//                     {/*    </div>*/}
//                     {/*))}*/}
//                     {books.map((book) => (
//                         <div
//                             key={book._id}
//                             className="border rounded p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 bg-white shadow"
//                         >
//                             <div className="flex flex-col gap-1 w-full">
//                                 <h3 className="font-semibold text-lg">{book.title}</h3>
//                                 <p><span className="font-medium">Author:</span> {book.author}</p>
//                                 {book.isbn && <p><span className="font-medium">ISBN:</span> {book.isbn}</p>}
//                                 {book.publishedDate && (
//                                     <p><span className="font-medium">Published Date:</span> {new Date(book.publishedDate).toISOString().split("T")[0]}</p>
//                                 )}
//                                 {book.genre && <p><span className="font-medium">Genre:</span> {book.genre}</p>}
//                                 {book.description && (
//                                     <p><span className="font-medium">Description:</span> {book.description}</p>
//                                 )}
//                                 <p><span className="font-medium">Copies Available:</span> {book.copiesAvailable}</p>
//                                 {book.createdAt && (
//                                     <p><span className="font-medium">Added On:</span> {new Date(book.createdAt).toISOString().split("T")[0]}</p>
//                                 )}
//                                 {book.profileImage && (
//                                     <img
//                                         src={book.profileImage}
//                                         alt={book.title}
//                                         className="h-32 w-auto object-cover rounded mt-2 border"
//                                     />
//                                 )}
//                             </div>
//
//                             <div className="flex sm:flex-col gap-2 sm:items-end">
//                                 <button
//                                     onClick={() => setEditBook(book)}
//                                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                 >
//                                     Update
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(book._id!)}
//                                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//
//                 </div>
//             )}
//
//             {/* Update Modal */}
//             {editBook && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <form
//                         onSubmit={handleUpdate}
//                         className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
//                     >
//                         <h2 className="text-lg font-bold">Update Book</h2>
//                         {["title", "author", "publishedDate", "genre", "description", "copiesAvailable"].map((field) => (
//                             <div key={field}>
//                                 <label className="block text-sm font-medium capitalize">{field}</label>
//                                 <input
//                                     type={field === "publishedDate" ? "date" : field === "copiesAvailable" ? "number" : "text"}
//                                     value={editBook[field as keyof Book] as string | number}
//                                     onChange={(e) =>
//                                         setEditBook({
//                                             ...editBook,
//                                             [field]: field === "copiesAvailable" ? +e.target.value : e.target.value,
//                                         } as Book)
//                                     }
//                                     className="border border-gray-300 rounded w-full p-2 mt-1"
//                                     required={field !== "description" && field !== "genre"}
//                                 />
//                             </div>
//                         ))}
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setEditBook(null)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={editLoading}
//                                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                             >
//                                 {editLoading ? "Updating..." : "Update"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default BookList;


import { useEffect, useState } from "react";
import { getAllBooks, deleteBook, updateBook, getFilteredBooks } from "../services/bookService.ts";
import toast from "react-hot-toast";
import type { Book } from "../types/Book.ts";
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
    FiClock
} from "react-icons/fi";

const BookList = ({ refreshFlag }: { refreshFlag: boolean }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [editLoading, setEditLoading] = useState(false);

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
            toast.success("Book deleted successfully");
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
            data.append("title", editBook.title ?? "");
            data.append("author", editBook.author ?? "");
            data.append("publishedDate", editBook.publishedDate ?? "");
            data.append("genre", editBook.genre ?? "");
            data.append("description", editBook.description ?? "");
            data.append("copiesAvailable", String(editBook.copiesAvailable));

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

    const handleSearch = async () => {
        setLoading(true);
        try {
            const filtered = await getFilteredBooks(searchParams);
            setBooks(filtered);
        } catch {
            toast.error("Failed to search books");
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

    if (loading) return (
        <div className="text-center mt-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading books...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FiBook className="mr-2" /> Book Catalog
                </h2>
                <div className="text-sm text-gray-500">
                    {books.length} {books.length === 1 ? 'book' : 'books'} found
                </div>
            </div>

            {/* Search Filters */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiSearch className="mr-2" /> Search Books
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={resetSearch}
                        className="px-4 py-2 border border-gray-300 rounded-lg flex items-center hover:bg-gray-50"
                    >
                        <FiX className="mr-2" /> Reset
                    </button>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
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
                <div className="grid gap-6">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {book.profileImage && (
                                    <div className="w-full md:w-50 flex-shrink-0">
                                        <img
                                            src={book.profileImage}
                                            alt={book.title}
                                            className="h-55 w-full object-cover rounded-lg border"
                                        />
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                                            <p className="text-gray-600 flex items-center mt-1">
                                                <FiUser className="mr-2" /> {book.author}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setEditBook(book)}
                                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                                                title="Edit book"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id!)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                                                title="Delete book"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {book.isbn && (
                                            <div className="flex items-start">
                                                <FiFileText className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-500">ISBN</p>
                                                    <p className="font-medium">{book.isbn}</p>
                                                </div>
                                            </div>
                                        )}
                                        {book.publishedDate && (
                                            <div className="flex items-start">
                                                <FiCalendar className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Published Date</p>
                                                    <p className="font-medium">
                                                        {new Date(book.publishedDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {book.genre && (
                                            <div className="flex items-start">
                                                <FiTag className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Genre</p>
                                                    <p className="font-medium">{book.genre}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-start">
                                            {book.copiesAvailable > 0 ? (
                                                <FiPlusCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                                            ) : (
                                                <FiMinusCircle className="mt-1 mr-2 text-red-500 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className="text-sm text-gray-500">Copies Available</p>
                                                <p className="font-medium">{book.copiesAvailable}</p>
                                            </div>
                                        </div>
                                        {book.createdAt && (
                                            <div className="flex items-start">
                                                <FiClock className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Added On</p>
                                                    <p className="font-medium">
                                                        {new Date(book.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {book.description && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FiFileText className="mr-2" /> Description
                                            </p>
                                            <p className="mt-1 text-gray-700">{book.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {editBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <FiEdit className="mr-2" /> Update Book
                            </h2>
                            <button
                                type="button"
                                onClick={() => setEditBook(null)}
                                className="text-gray-500 hover:text-gray-700"
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

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setEditBook(null)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                            >
                                <FiX className="mr-2" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={editLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-70"
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
        </div>
    );
};

export default BookList;