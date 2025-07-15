import React, { useState } from "react";
import AddBookForm from "../pages/AddBook.tsx";
import BookList from "./BookList";

const ManageBookPage: React.FC = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);

    const handleBookAdded = () => {
        setRefreshFlag((prev) => !prev);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold">📚 Manage Books</h1>
            <AddBookForm onBookAdded={handleBookAdded} />
            <BookList refreshFlag={refreshFlag} />
        </div>
    );
};

export default ManageBookPage;
