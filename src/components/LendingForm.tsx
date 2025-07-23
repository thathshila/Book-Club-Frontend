import { useState } from "react";
import { lendBook } from "../services/lendingService.ts";
import toast from "react-hot-toast";

// Utility to get today + 14 days in yyyy-mm-dd
const getDefaultDueDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

const LendBookForm = ({ onLend }: { onLend: () => void }) => {
    const [memberId, setMemberId] = useState("");
    const [isbn, setIsbn] = useState("");
    const [dueDate, setDueDate] = useState(getDefaultDueDate());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await lendBook({ memberId, isbn, dueDate });
            toast.success("Book lent successfully");

            // Reset with default due date
            setMemberId("");
            setIsbn("");
            setDueDate(getDefaultDueDate());

            onLend();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to lend book");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Lend a Book</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                    type="text"
                    placeholder="Member ID"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Lend Book
                </button>
            </form>
        </div>
    );
};

export default LendBookForm;
