import React, { useEffect, useState } from "react";
import { fetchAuditLogs } from "../services/auditService";

interface AuditLog {
    _id: string;
    action: string;
    performedBy: string;
    entityType: string;
    entityId: string;
    details?: string;
    timestamp: string;
}

const AuditLogTable: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLogs = async () => {
            try {
                setLoading(true);
                const data = await fetchAuditLogs();
                setLogs(data);
            } catch (err) {
                setError("Failed to fetch audit logs");
            } finally {
                setLoading(false);
            }
        };

        loadLogs();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Audit Logs</h2>
            {loading && <p>Loading logs...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && logs.length === 0 && <p>No logs found.</p>}
            {!loading && logs.length > 0 && (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Action</th>
                        <th className="py-2 px-4 border-b">Performed By</th>
                        <th className="py-2 px-4 border-b">Entity Type</th>
                        <th className="py-2 px-4 border-b">Entity ID</th>
                        <th className="py-2 px-4 border-b">Details</th>
                        <th className="py-2 px-4 border-b">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map(log => (
                        <tr key={log._id}>
                            <td className="py-2 px-4 border-b">{log.action}</td>
                            <td className="py-2 px-4 border-b">{log.performedBy}</td>
                            <td className="py-2 px-4 border-b">{log.entityType}</td>
                            <td className="py-2 px-4 border-b">{log.entityId}</td>
                            <td className="py-2 px-4 border-b">{log.details || "-"}</td>
                            <td className="py-2 px-4 border-b">
                                {new Date(log.timestamp).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AuditLogTable;
