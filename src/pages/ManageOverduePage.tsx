
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getOverdueLendings,
    getOverduePayments,
} from "../services/lendingService.ts";
import Swal from 'sweetalert2';

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
    const [collectedPayments, setCollectedPayments] = useState<string[]>([]); // NEW

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [overdues, fines] = await Promise.all([
                    getOverdueLendings(),
                    getOverduePayments(),
                ]);
                setOverdueList(overdues);
                setPayments(fines);

                if (overdues.length > 0) {
                    Swal.fire({
                        title: 'Overdue Items Detected',
                        text: `You have ${overdues.length} overdue book(s) to manage`,
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        backdrop: true,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
            } catch (err) {
                toast.error("Failed to fetch overdue information");
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load overdue information',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                }).then(() => {
                    window.location.reload();
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSendReminder = (lending: OverdueLending) => {
        Swal.fire({
            title: 'Send Reminder?',
            html: `Send overdue reminder to <b>${lending.reader.name}</b> about <i>${lending.book.title}</i>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Send Reminder',
            cancelButtonText: 'Cancel',
            backdrop: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Reminder Sent!',
                    text: `${lending.reader.name} has been notified about the overdue book.`,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        });
    };

    const handleCollectPayment = (payment: PaymentInfo) => {
        Swal.fire({
            title: 'Collect Payment',
            html: `
            <div class="text-left">
                <p>Reader: <b>${payment.reader.name}</b></p>
                <p>Member ID: ${payment.reader.memberId}</p>
                <p class="mt-2">Total Fine: <b>Rs. ${payment.totalFine.toFixed(2)}</b></p>
                <hr class="my-3">
                <div class="form-group">
                    <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                    <input type="number" id="amount" class="swal2-input" placeholder="Enter amount" value="${payment.totalFine.toFixed(2)}">
                </div>
            </div>
        `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm Payment',
            cancelButtonText: 'Cancel',
            backdrop: true,
            focusConfirm: false,
            preConfirm: () => {
                const amountInput = Swal.getPopup()?.querySelector('#amount') as HTMLInputElement;
                const amount = parseFloat(amountInput.value);
                if (isNaN(amount) || amount <= 0) {
                    Swal.showValidationMessage('Please enter a valid amount');
                    return false;
                }
                return amount;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const memberId = payment.reader.memberId;

                setCollectedPayments((prev) => [...prev, memberId]);

                setPayments((prev) => prev.filter((p) => p.reader.memberId !== memberId));

                setOverdueList((prev) => prev.filter((l) => l.reader.memberId !== memberId));

                Swal.fire({
                    title: 'Payment Recorded!',
                    text: `Rs. ${result.value} collected from ${payment.reader.name}`,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        });
    };

    return (
        <div className="p-3 sm:p-6 max-w-7xl mx-auto">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 flex items-center">
                    <span className="mr-2 sm:mr-3">📚</span> Overdue Lendings
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                    Manage overdue books and associated fines
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-6 sm:space-y-8">
                    {/* Overdue Lendings */}
                    <section className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
                        <div className="p-3 sm:p-4 border-b">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                Overdue Books
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500">
                                {overdueList.length} overdue records found
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reader</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {overdueList.length > 0 ? overdueList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{item.reader.name}</div>
                                            <div className="text-sm text-gray-500">{item.reader.memberId}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{item.book.title}</div>
                                            <div className="text-sm text-gray-500">ISBN: {item.book.isbn}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    {new Date(item.dueDate).toLocaleDateString()}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {collectedPayments.includes(item.reader.memberId) ? (
                                                <button
                                                    disabled
                                                    className="text-xs sm:text-sm bg-gray-400 text-white px-2 sm:px-3 py-1 rounded cursor-not-allowed"
                                                >
                                                    Paid
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleSendReminder(item)}
                                                    className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded"
                                                >
                                                    Remind
                                                </button>
                                            )}

                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No overdue lendings found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Overdue Payments */}
                    <section className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
                        <div className="p-3 sm:p-4 border-b">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                                <span className="mr-1 sm:mr-2">💰</span> Overdue Payments
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Total fines to be collected
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reader</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fine</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {payments.length > 0 ? payments.map((payment, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{payment.reader.name}</div>
                                            <div className="text-sm text-gray-500">{payment.reader.memberId}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    Rs. {payment.totalFine.toFixed(2)}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {collectedPayments.includes(payment.reader.memberId) ? (
                                                <button
                                                    disabled
                                                    className="text-xs sm:text-sm bg-gray-400 text-white px-2 sm:px-3 py-1 rounded cursor-not-allowed"
                                                >
                                                    Paid
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleCollectPayment(payment)}
                                                    className="text-xs sm:text-sm bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 rounded"
                                                >
                                                    Collect
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
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
