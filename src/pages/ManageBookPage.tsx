//
// import React, { useState } from "react";
// import AddBookForm from "../components/AddBook.tsx";
// import BookList from "../components/BookList.tsx";
//
// const ManageBookPage: React.FC = () => {
//     const [refreshFlag, setRefreshFlag] = useState(false);
//     const [showAddForm, setShowAddForm] = useState(false);
//
//     const handleBookAdded = () => {
//         setRefreshFlag((prev) => !prev);
//         setShowAddForm(false); // hide form after adding
//     };
//
//     return (
//         <div className="max-w-6xl mx-auto p-6 space-y-8">
//             <h1 className="text-2xl font-bold">📚 Manage Books</h1>
//
//             {/* Add Book Button */}
//             <button
//                 onClick={() => setShowAddForm(!showAddForm)}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//             >
//                 {showAddForm ? "Close Add Book Form" : "Add New Book"}
//             </button>
//
//             {/* Conditionally render AddBookForm */}
//             {showAddForm && <AddBookForm onBookAdded={handleBookAdded} />}
//
//             {/* Book List */}
//             <BookList refreshFlag={refreshFlag} />
//         </div>
//     );
// };
//
// export default ManageBookPage;
import React, { useState } from "react";
import { FaBook, FaPlus, FaTimes, FaSync } from "react-icons/fa";
import AddBookForm from "../components/AddBook.tsx";
import BookList from "../components/BookList.tsx";

const ManageBookPage: React.FC = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleBookAdded = () => {
        setRefreshFlag((prev) => !prev);
        setShowAddForm(false);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setRefreshFlag((prev) => !prev);
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <FaBook className="text-indigo-600 text-3xl" />
                    <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
                </div>
                <button
                    onClick={handleRefresh}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isRefreshing ? 'bg-gray-200' : 'bg-indigo-50 hover:bg-indigo-100'} text-indigo-600 transition-colors`}
                    disabled={isRefreshing}
                >
                    <FaSync className={`${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-all ${showAddForm ? 'bg-red-50 hover:bg-red-100 text-red-600' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                    {showAddForm ? (
                        <>
                            <FaTimes />
                            <span>Close Form</span>
                        </>
                    ) : (
                        <>
                            <FaPlus />
                            <span>Add New Book</span>
                        </>
                    )}
                </button>
            </div>

            {/* Add Book Form with Smooth Transition */}
            <div className={`transition-all duration-300 ${showAddForm ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                {showAddForm && (
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <AddBookForm onBookAdded={handleBookAdded} />
                    </div>
                )}
            </div>

            {/* Book List Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FaBook className="mr-2 text-indigo-500" />
                    Book Collection
                </h2>
                <BookList refreshFlag={refreshFlag} />
            </div>
        </div>
    );
};

export default ManageBookPage;