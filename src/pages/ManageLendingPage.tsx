
import { useState } from "react";
import LendingList from "../components/LendingList.tsx";
import { sendOverdueNotifications } from "../services/lendingService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LendingManagementPage = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSendNotifications = async () => {
        const result = await MySwal.fire({
            title: 'Confirm Notification',
            text: "Send overdue notifications to all readers with overdue books?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, send notifications'
        });

        if (!result.isConfirmed) return;

        try {
            setSending(true);
            const data = await sendOverdueNotifications();
            MySwal.fire({
                title: 'Success',
                text: data.message || "Notifications sent successfully",
                icon: 'success',
                confirmButtonColor: '#4f46e5',
            });
            setRefreshFlag((prev) => !prev);
        } catch (error: any) {
            MySwal.fire({
                title: 'Error',
                text: error?.response?.data?.message || "Failed to send notifications",
                icon: 'error',
                confirmButtonColor: '#4f46e5',
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Lending Management</h1>

            <div className="flex justify-center mb-6">
                <button
                    onClick={handleSendNotifications}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                    disabled={sending}
                >
                    {sending ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Notifications...
                        </span>
                    ) : (
                        "Send Overdue Notifications"
                    )}
                </button>
            </div>

            <LendingList refreshFlag={refreshFlag} />
        </div>
    );
};

export default LendingManagementPage;