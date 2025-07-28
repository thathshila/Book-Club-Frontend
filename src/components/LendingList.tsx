//
// import { useEffect, useState } from "react";
// import { getLendings, returnBook } from "../services/lendingService.ts";
// import type { Lending } from "../types/Lending.ts";
// import toast from "react-hot-toast";
//
// const LendingList = ({ refreshFlag }: { refreshFlag: boolean }) => {
//     const [lendings, setLendings] = useState<Lending[]>([]);
//     const [loading, setLoading] = useState(false);
//
//     const fetchLendings = async () => {
//         setLoading(true);
//         try {
//             const data = await getLendings();
//             setLendings(data);
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Failed to load lending history");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchLendings();
//     }, [refreshFlag]);
//
//     const handleReturn = async (id: string) => {
//         if (!confirm("Mark this book as returned?")) return;
//         try {
//             await returnBook(id);
//             toast.success("Book marked as returned");
//             fetchLendings();
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Failed to return book");
//         }
//     };
//
//     const isOverdue = (lending: Lending) => {
//         return (lending.status === "borrowed" || lending.status === "overdue") &&
//             new Date(lending.dueDate) < new Date();
//     };
//
//
//     if (loading) return <p>Loading lending history...</p>;
//
//     return (
//         <div className="max-w-4xl mx-auto mt-8">
//             <h2 className="text-xl font-bold mb-4">Lending History</h2>
//             {lendings.length === 0 ? (
//                 <p>No lending records.</p>
//             ) : (
//                 <div className="grid gap-4">
//                     {lendings.map((lending) => (
//                         <div
//                             key={lending._id}
//                             className="border p-4 rounded flex justify-between items-center"
//                         >
//                             <div>
//                                 <p>
//                                     <strong>Book:</strong> {lending.book?.title ?? "Unknown"} by {lending.book?.author ?? "Unknown"}
//                                 </p>
//                                 <p>
//                                     <strong>Reader:</strong> {lending.reader?.name ?? "Unknown"} ({lending.reader?.email ?? "Unknown"})
//                                 </p>
//                                 <p>
//                                     <strong>Due Date:</strong>{" "}
//                                     {new Date(lending.dueDate).toLocaleDateString()}
//                                 </p>
//                                 <p>
//                                     <strong>Status:</strong>{" "}
//                                     {(lending.status === "overdue" || isOverdue(lending)) ? (
//                                         <span className="text-red-600 font-semibold">Overdue</span>
//                                     ) : (
//                                         lending.status
//                                     )}
//                                 </p>
//                             </div>
//                             {(lending.status === "borrowed" || lending.status === "overdue") && (
//                                 <button
//                                     onClick={() => handleReturn(lending._id)}
//                                     className={`px-3 py-1 rounded text-white ${
//                                         isOverdue(lending) || lending.status === "overdue"
//                                             ? "bg-red-600 hover:bg-red-700"
//                                             : "bg-green-600 hover:bg-green-700"
//                                     }`}
//                                 >
//                                     Mark Returned
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default LendingList;


// LendingList.tsx
import { useEffect, useState } from "react";
import { getLendings, returnBook } from "../services/lendingService.ts";
import type { Lending } from "../types/Lending.ts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LendingList = ({ refreshFlag }: { refreshFlag: boolean }) => {
    const [lendings, setLendings] = useState<Lending[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLendings = async () => {
        setLoading(true);
        try {
            const data = await getLendings();
            setLendings(data);
        } catch (error: any) {
            MySwal.fire({
                title: 'Error',
                text: error?.response?.data?.message || "Failed to load lending history",
                icon: 'error',
                confirmButtonColor: '#4f46e5',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLendings();
    }, [refreshFlag]);

    const handleReturn = async (id: string) => {
        const result = await MySwal.fire({
            title: 'Confirm Return',
            text: "Mark this book as returned?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, mark as returned'
        });

        if (!result.isConfirmed) return;

        try {
            await returnBook(id);
            MySwal.fire({
                title: 'Success',
                text: "Book marked as returned",
                icon: 'success',
                confirmButtonColor: '#4f46e5',
            });
            fetchLendings();
        } catch (error: any) {
            MySwal.fire({
                title: 'Error',
                text: error?.response?.data?.message || "Failed to return book",
                icon: 'error',
                confirmButtonColor: '#4f46e5',
            });
        }
    };

    const isOverdue = (lending: Lending) => {
        return (lending.status === "borrowed" || lending.status === "overdue") &&
            new Date(lending.dueDate) < new Date();
    };

    if (loading) return (
        <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Lending History</h2>
            {lendings.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No lending records found.</p>
            ) : (
                <div className="grid gap-4 sm:gap-6">
                    {lendings.map((lending) => (
                        <div
                            key={lending._id}
                            className="border p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                            <div className="space-y-2">
                                <p className="font-medium">
                                    <span className="text-gray-600">Book:</span> {lending.book?.title ?? "Unknown"} by {lending.book?.author ?? "Unknown"}
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-600">Reader:</span> {lending.reader?.name ?? "Unknown"} ({lending.reader?.email ?? "Unknown"})
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-600">Due Date:</span> {new Date(lending.dueDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-600">Status:</span>{" "}
                                    {(lending.status === "overdue" || isOverdue(lending)) ? (
                                        <span className="text-red-600 font-semibold">Overdue</span>
                                    ) : (
                                        <span className="text-gray-700">{lending.status}</span>
                                    )}
                                </p>
                            </div>
                            {(lending.status === "borrowed" || lending.status === "overdue") && (
                                <button
                                    onClick={() => handleReturn(lending._id)}
                                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-white text-sm sm:text-base ${
                                        isOverdue(lending) || lending.status === "overdue"
                                            ? "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    } transition-colors`}
                                >
                                    Mark Returned
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LendingList;