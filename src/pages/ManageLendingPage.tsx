import { useState } from "react";
import LendBookForm from "../pages/LendingForm";
import LendingList from "../pages/LendingList";

const LendingManagementPage = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);

    const handleRefresh = () => {
        setRefreshFlag((prev) => !prev);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Lending Management</h1>
            <div className="mb-8">
                <LendBookForm onLend={handleRefresh} />
            </div>
            <LendingList refreshFlag={refreshFlag} />
        </div>
    );
};

export default LendingManagementPage;
