import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getOverdueLendings,
    getOverduePayments,
} from "../services/lendingService.ts"; // Make sure path is correct

type OverdueLending = {
    _id: string;
    reader: { name: string; memberId: string };
    book: { title: string; isbn: string };
    dueDate: string;
    createdAt: string;
};

type PaymentInfo = {
    reader: { name: string; memberId: string };
    totalFine: number;
};

const ManageOverduePage = () => {
    const [overdueList, setOverdueList] = useState<OverdueLending[]>([]);
    const [payments, setPayments] = useState<PaymentInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [overdues, fines] = await Promise.all([
                    getOverdueLendings(),
                    getOverduePayments(),
                ]);
                setOverdueList(overdues);
                setPayments(fines);
            } catch (err) {
                toast.error("Failed to fetch overdue information");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📚 Overdue Lendings</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Overdue lendings table */}
                    <table className="w-full border text-sm shadow-md">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">#</th>
                            <th className="p-2">Reader</th>
                            <th className="p-2">Book</th>
                            <th className="p-2">Due Date</th>
                            <th className="p-2">Lent At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {overdueList.map((item, index) => (
                            <tr key={item._id} className="border-t">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">
                                    {item.reader.name} ({item.reader.memberId})
                                </td>
                                <td className="p-2">
                                    {item.book.title} ({item.book.isbn})
                                </td>
                                <td className="p-2 text-red-600">
                                    {new Date(item.dueDate).toLocaleDateString()}
                                </td>
                                <td className="p-2">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Overdue payment table */}
                    <h2 className="text-xl font-semibold mt-8 mb-2">💰 Overdue Payments</h2>
                    <table className="w-full border text-sm shadow-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Reader</th>
                            <th className="p-2">Total Overdue Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map((payment, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="p-2">
                                    {payment.reader.name} ({payment.reader.memberId})
                                </td>
                                <td className="p-2 text-blue-600">
                                    Rs. {payment.totalFine.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ManageOverduePage;
