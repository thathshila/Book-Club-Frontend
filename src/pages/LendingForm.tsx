import { useState } from "react";
import { lendBook } from "../services/lendingService";
import toast from "react-hot-toast";

const LendBookForm = ({ onLend }: { onLend: () => void }) => {
    const [memberId, setMemberId] = useState("");
    const [isbn, setIsbn] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await lendBook({ memberId, isbn, dueDate });
            toast.success("Book lent successfully");
            setMemberId("");
            setIsbn("");
            setDueDate("");
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
