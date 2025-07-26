//
// import { useState } from "react";
// import { lendBook } from "../services/lendingService.ts";
// import toast from "react-hot-toast";
//
// // Utility to get today + 14 days in yyyy-mm-dd
// const getDefaultDueDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 14);
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, "0");
//     const dd = String(today.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
// };
//
// const LendBookForm = ({ onLend }: { onLend: () => void }) => {
//     const [memberId, setMemberId] = useState("");
//     const [isbn, setIsbn] = useState("");
//     const [dueDate, setDueDate] = useState(getDefaultDueDate());
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const fullMemberId = `Reader-2025-${memberId}`;
//             await lendBook({ memberId: fullMemberId, isbn, dueDate });
//             toast.success("Book lent successfully");
//
//             // Reset with default due date
//             setMemberId("");
//             setIsbn("");
//             setDueDate(getDefaultDueDate());
//
//             onLend();
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Failed to lend book");
//         }
//     };
//
//     return (
//         <div className="max-w-md mx-auto mt-8 p-4 border rounded">
//             <h2 className="text-xl font-bold mb-4">Lend a Book</h2>
//             <form onSubmit={handleSubmit} className="grid gap-4">
//                 <input
//                     type="text"
//                     placeholder="Enter last 5 digits of Member ID"
//                     value={memberId}
//                     onChange={(e) => setMemberId(e.target.value)}
//                     className="border p-2 rounded"
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="ISBN"
//                     value={isbn}
//                     onChange={(e) => setIsbn(e.target.value)}
//                     className="border p-2 rounded"
//                     required
//                 />
//                 <input
//                     type="date"
//                     value={dueDate}
//                     onChange={(e) => setDueDate(e.target.value)}
//                     className="border p-2 rounded"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Lend Book
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default LendBookForm;

import { useState, useEffect } from "react";
import { lendBook } from "../services/lendingService.ts";
import toast from "react-hot-toast";
import { FiUser, FiBook, FiCalendar, FiUserPlus, FiX } from "react-icons/fi";

// Utility to get today + 14 days in yyyy-mm-dd
const getDefaultDueDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

interface LendBookFormProps {
    onLend: () => void;
    prefilledIsbn?: string; // New prop for pre-filled ISBN
    onClose?: () => void;   // Optional close handler
}

const LendBookForm = ({ onLend, prefilledIsbn, onClose }: LendBookFormProps) => {
    const [memberId, setMemberId] = useState("");
    const [isbn, setIsbn] = useState(prefilledIsbn || "");
    const [dueDate, setDueDate] = useState(getDefaultDueDate());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update ISBN when prefilledIsbn changes
    useEffect(() => {
        if (prefilledIsbn) {
            setIsbn(prefilledIsbn);
        }
    }, [prefilledIsbn]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const fullMemberId = `Reader-2025-${memberId}`;
            await lendBook({ memberId: fullMemberId, isbn, dueDate });
            toast.success("Book lent successfully");

            // Reset form with default due date
            setMemberId("");
            setIsbn("");
            setDueDate(getDefaultDueDate());

            onLend();

            // Close form if onClose is provided
            if (onClose) {
                onClose();
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to lend book");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Reset form
        setMemberId("");
        setIsbn("");
        setDueDate(getDefaultDueDate());

        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiUserPlus className="mr-2" /> Lend a Book
                </h2>
                {onClose && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                        <FiUser className="mr-2" />
                        Member ID (Last 5 digits)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            Reader-2025-
                        </span>
                        <input
                            type="text"
                            placeholder="12345"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 pl-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            maxLength={5}
                            pattern="[0-9]{5}"
                            title="Please enter exactly 5 digits"
                        />
                    </div>
                    <p className="text-xs text-gray-500">Enter the last 5 digits of the member ID</p>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                        <FiBook className="mr-2" />
                        ISBN
                    </label>
                    <input
                        type="text"
                        placeholder="978-0-123456-78-9"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        readOnly={!!prefilledIsbn} // Make readonly if pre-filled
                    />
                    {prefilledIsbn && (
                        <p className="text-xs text-blue-600">ISBN automatically filled from selected book</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                        <FiCalendar className="mr-2" />
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        min={new Date().toISOString().split('T')[0]} // Prevent past dates
                    />
                    <p className="text-xs text-gray-500">Default: 14 days from today</p>
                </div>

                <div className="flex space-x-3 pt-4">
                    {onClose && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors"
                        >
                            <FiX className="mr-2" /> Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Lending...
                            </>
                        ) : (
                            <>
                                <FiUserPlus className="mr-2" /> Lend Book
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LendBookForm;
