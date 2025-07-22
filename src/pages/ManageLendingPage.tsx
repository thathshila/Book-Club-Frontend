// import { useState } from "react";
// import LendBookForm from "../pages/LendingForm";
// import LendingList from "../pages/LendingList";
//
// const LendingManagementPage = () => {
//     const [refreshFlag, setRefreshFlag] = useState(false);
//
//     const handleRefresh = () => {
//         setRefreshFlag((prev) => !prev);
//     };
//
//     return (
//         <div className="max-w-5xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6 text-center">Lending Management</h1>
//             <div className="mb-8">
//                 <LendBookForm onLend={handleRefresh} />
//             </div>
//             <LendingList refreshFlag={refreshFlag} />
//         </div>
//     );
// };
//
// export default LendingManagementPage;
import { useState } from "react";
import LendBookForm from "../components/LendingForm.tsx";
import LendingList from "../components/LendingList.tsx";
import { sendOverdueNotifications } from "../services/lendingService";
import toast from "react-hot-toast";

const LendingManagementPage = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [sending, setSending] = useState(false);

    const handleRefresh = () => {
        setRefreshFlag((prev) => !prev);
    };

    const handleSendNotifications = async () => {
        if (!confirm("Send overdue notifications to all readers with overdue books?")) return;
        try {
            setSending(true);
            const data = await sendOverdueNotifications();
            toast.success(data.message || "Notifications sent successfully");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to send notifications");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Lending Management</h1>

            <div className="flex justify-center mb-6">
                <button
                    onClick={handleSendNotifications}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    disabled={sending}
                >
                    {sending ? "Sending Notifications..." : "Send Overdue Notifications"}
                </button>
            </div>

            <div className="mb-8">
                <LendBookForm onLend={handleRefresh} />
            </div>
            <LendingList refreshFlag={refreshFlag} />
        </div>
    );
};

export default LendingManagementPage;
