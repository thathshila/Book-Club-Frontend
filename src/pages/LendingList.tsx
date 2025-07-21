import { useEffect, useState } from "react";
import { getLendings, returnBook } from "../services/lendingService";
import type { Lending } from "../types/Lending";
import toast from "react-hot-toast";

const LendingList = ({ refreshFlag }: { refreshFlag: boolean }) => {
    const [lendings, setLendings] = useState<Lending[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLendings = async () => {
        setLoading(true);
        try {
            const data = await getLendings();
            setLendings(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to load lending history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLendings();
    }, [refreshFlag]);

    const handleReturn = async (id: string) => {
        if (!confirm("Mark this book as returned?")) return;
        try {
            await returnBook(id);
            toast.success("Book marked as returned");
            fetchLendings();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to return book");
        }
    };

    if (loading) return <p>Loading lending history...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Lending History</h2>
            {lendings.length === 0 ? (
                <p>No lending records.</p>
            ) : (
                <div className="grid gap-4">
                    {lendings.map((lending) => (
                        <div
                            key={lending._id}
                            className="border p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <p>
                                    <strong>Book:</strong> {lending.book?.title ?? "Unknown"} by {lending.book?.author ?? "Unknown"}
                                </p>
                                <p>
                                    <strong>Reader:</strong> {lending.reader?.name ?? "Unknown"} ({lending.reader?.email ?? "Unknown"})
                                </p>
                                <p>
                                    <strong>Due Date:</strong>{" "}
                                    {new Date(lending.dueDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Status:</strong> {lending.status}
                                </p>
                            </div>
                            {lending.status === "borrowed" && (
                                <button
                                    onClick={() => handleReturn(lending._id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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
