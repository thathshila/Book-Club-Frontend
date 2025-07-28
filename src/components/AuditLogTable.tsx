
import React, { useEffect, useState } from "react";
import { fetchAuditLogs } from "../services/auditService";
import {
    FiActivity,
    FiClock,
    FiInfo,
    FiAlertCircle,
    FiChevronDown,
    FiChevronUp
} from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const loadLogs = async () => {
            try {
                setLoading(true);
                const data = await fetchAuditLogs();
                setLogs(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch audit logs:", err);
                setError("Failed to fetch audit logs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadLogs();
    }, []);

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            full: date.toLocaleString()
        };
    };

    const toggleExpand = (logId: string) => {
        setExpandedLogs(prev => ({
            ...prev,
            [logId]: !prev[logId]
        }));
    };

    const getActionColor = (action: string) => {
        switch (action.toLowerCase()) {
            case 'create':
                return 'bg-green-100 text-green-800';
            case 'update':
                return 'bg-blue-100 text-blue-800';
            case 'delete':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-full mx-auto">
            <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <FiActivity className="text-xl" />
                </div>
                <h2 className="ml-3 text-2xl font-bold text-gray-800">Audit Logs</h2>
                <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          {logs.length} entries
        </span>
            </div>

            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                >
                    <FaSpinner className="animate-spin text-indigo-600 text-3xl mb-4" />
                    <p className="text-gray-600">Loading audit logs...</p>
                </motion.div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error loading logs</h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                            >
                                Try again →
                            </button>
                        </div>
                    </div>
                </motion.div>
            ) : logs.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                            <FiInfo className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">No audit logs found</h3>
                            <p className="text-sm text-blue-700 mt-1">The system doesn't have any audit records yet.</p>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Entity
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Timestamp
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        {log.performedBy}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                        {log.entityType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <FiClock className="mr-1.5 text-gray-400" size={14} />
                                            {formatTimestamp(log.timestamp).full}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                        <div className="line-clamp-1">
                                            {log.details || "—"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {logs.map((log) => (
                            <motion.div
                                key={log._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden"
                            >
                                <div
                                    className="p-4 cursor-pointer"
                                    onClick={() => toggleExpand(log._id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getActionColor(log.action)} mr-2`}>
                          {log.action}
                        </span>
                                                <span className="text-xs text-gray-500">
                          {formatTimestamp(log.timestamp).time}
                        </span>
                                            </div>
                                            <h3 className="mt-1 text-sm font-medium text-gray-900">
                                                {log.performedBy}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {log.entityType} • ID: {log.entityId.substring(0, 6)}...
                                            </p>
                                        </div>
                                        <button className="text-gray-400">
                                            {expandedLogs[log._id] ? <FiChevronUp /> : <FiChevronDown />}
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedLogs[log._id] && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-4 pb-4"
                                        >
                                            <div className="pt-2 border-t border-gray-100">
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div>
                                                        <p className="text-gray-500">Entity Type</p>
                                                        <p className="font-medium capitalize">{log.entityType}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Entity ID</p>
                                                        <p className="font-mono font-medium">{log.entityId}</p>
                                                    </div>
                                                </div>

                                                {log.details && (
                                                    <div className="mt-3">
                                                        <p className="text-gray-500 text-sm">Details</p>
                                                        <p className="text-gray-700 mt-1 text-sm whitespace-pre-wrap">
                                                            {log.details}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="mt-3 flex items-center text-gray-500 text-sm">
                                                    <FiClock className="mr-1.5" size={14} />
                                                    Full timestamp: {formatTimestamp(log.timestamp).full}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AuditLogTable;