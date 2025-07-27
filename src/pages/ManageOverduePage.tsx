// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//     getOverdueLendings,
//     getOverduePayments,
// } from "../services/lendingService.ts"; // Make sure path is correct
//
// type OverdueLending = {
//     _id: string;
//     reader: { name: string; memberId: string };
//     book: { title: string; isbn: string };
//     dueDate: string;
//     createdAt: string;
// };
//
// type PaymentInfo = {
//     reader: { name: string; memberId: string };
//     totalFine: number;
// };
//
// const ManageOverduePage = () => {
//     const [overdueList, setOverdueList] = useState<OverdueLending[]>([]);
//     const [payments, setPayments] = useState<PaymentInfo[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [overdues, fines] = await Promise.all([
//                     getOverdueLendings(),
//                     getOverduePayments(),
//                 ]);
//                 setOverdueList(overdues);
//                 setPayments(fines);
//             } catch (err) {
//                 toast.error("Failed to fetch overdue information");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);
//
//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">📚 Overdue Lendings</h1>
//
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {/* Overdue lendings table */}
//                     <table className="w-full border text-sm shadow-md">
//                         <thead className="bg-gray-200">
//                         <tr>
//                             <th className="p-2">#</th>
//                             <th className="p-2">Reader</th>
//                             <th className="p-2">Book</th>
//                             <th className="p-2">Due Date</th>
//                             <th className="p-2">Lent At</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {overdueList.map((item, index) => (
//                             <tr key={item._id} className="border-t">
//                                 <td className="p-2">{index + 1}</td>
//                                 <td className="p-2">
//                                     {item.reader.name} ({item.reader.memberId})
//                                 </td>
//                                 <td className="p-2">
//                                     {item.book.title} ({item.book.isbn})
//                                 </td>
//                                 <td className="p-2 text-red-600">
//                                     {new Date(item.dueDate).toLocaleDateString()}
//                                 </td>
//                                 <td className="p-2">
//                                     {new Date(item.createdAt).toLocaleDateString()}
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//
//                     {/* Overdue payment table */}
//                     <h2 className="text-xl font-semibold mt-8 mb-2">💰 Overdue Payments</h2>
//                     <table className="w-full border text-sm shadow-md">
//                         <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-2">Reader</th>
//                             <th className="p-2">Total Overdue Amount</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {payments.map((payment, idx) => (
//                             <tr key={idx} className="border-t">
//                                 <td className="p-2">
//                                     {payment.reader.name} ({payment.reader.memberId})
//                                 </td>
//                                 <td className="p-2 text-blue-600">
//                                     Rs. {payment.totalFine.toFixed(2)}
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default ManageOverduePage;


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getOverdueLendings,
    getOverduePayments,
} from "../services/lendingService.ts";

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
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-3">📚</span> Overdue Lendings
                </h1>
                <p className="text-gray-600">
                    Manage overdue books and associated fines
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Overdue lendings section */}
                    <section className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Overdue Books
                            </h2>
                            <p className="text-sm text-gray-500">
                                {overdueList.length} overdue records found
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reader
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Book
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lent At
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {overdueList.length > 0 ? (
                                    overdueList.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.reader.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {item.reader.memberId}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.book.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ISBN: {item.book.isbn}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        {new Date(item.dueDate).toLocaleDateString()}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No overdue lendings found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Overdue payments section */}
                    <section className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <span className="mr-2">💰</span> Overdue Payments
                            </h2>
                            <p className="text-sm text-gray-500">
                                Total fines to be collected
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reader
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Overdue Amount
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {payments.length > 0 ? (
                                    payments.map((payment, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payment.reader.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {payment.reader.memberId}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        Rs. {payment.totalFine.toFixed(2)}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No overdue payments found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default ManageOverduePage;