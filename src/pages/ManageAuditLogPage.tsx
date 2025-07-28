import React from "react";
import AuditLogTable from "../components/AuditLogTable";

const AuditLogsPage: React.FC = () => {
    return (
        <div className="container mx-auto mt-6">
            <AuditLogTable />
        </div>
    );
};

export default AuditLogsPage;
