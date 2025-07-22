
import React, { useState } from "react";
import AddBookForm from "../components/AddBook.tsx";
import BookList from "../components/BookList.tsx";

const ManageBookPage: React.FC = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleBookAdded = () => {
        setRefreshFlag((prev) => !prev);
        setShowAddForm(false); // hide form after adding
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold">📚 Manage Books</h1>

            {/* Add Book Button */}
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                {showAddForm ? "Close Add Book Form" : "Add New Book"}
            </button>

            {/* Conditionally render AddBookForm */}
            {showAddForm && <AddBookForm onBookAdded={handleBookAdded} />}

            {/* Book List */}
            <BookList refreshFlag={refreshFlag} />
        </div>
    );
};

export default ManageBookPage;
