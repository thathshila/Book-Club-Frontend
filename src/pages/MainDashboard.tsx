
import React, { useState, useEffect } from "react";
import {
    MdMenuBook,
    MdPerson,
    MdLibraryBooks,
    MdNotificationsActive,
    MdHistory,
    MdAssignmentReturn,
    MdRefresh
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import apiClient from "../services/apiClient.ts";

interface DashboardData {
    totalBooks: number;
    totalReaders: number;
    booksLentOut: number;
    overdueBooks: number;
}

const MainDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        totalBooks: 0,
        totalReaders: 0,
        booksLentOut: 0,
        overdueBooks: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const fetchDashboardData = async () => {
        try {
            setRefreshing(true);
            setError(null);
            const response = await apiClient.get("/dashboard/counts");
            const { totalBooks, totalReaders, booksLentOut, overdueBooks } = response.data;
            setDashboardData({ totalBooks, totalReaders, booksLentOut, overdueBooks });
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleRefresh = () => {
        fetchDashboardData();
    };

    const StatCard = ({
                          icon,
                          title,
                          value,
                          color
                      }: {
        icon: React.ReactNode;
        title: string;
        value: number;
        color: string;
    }) => (
        <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-${color}-500`}>
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600 text-xl`}>
                    {icon}
                </div>
                {loading ? (
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    <span className={`text-sm px-3 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
                        {value.toLocaleString()}
                    </span>
                )}
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mt-4">{title}</h2>
            {loading ? (
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
            ) : (
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    {value.toLocaleString()}
                </p>
            )}
        </div>
    );

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            {loading ? "Loading library statistics..." : "Real-time library overview"}
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`flex items-center px-4 py-2 rounded-md ${
                            refreshing ? "bg-gray-200" : "bg-indigo-50 hover:bg-indigo-100"
                        } text-indigo-600 transition-colors`}
                    >
                        {refreshing ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : (
                            <MdRefresh className="mr-2" />
                        )}
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <MdNotificationsActive className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        icon={<MdMenuBook className="w-6 h-6" />}
                        title="Total Books"
                        value={dashboardData.totalBooks}
                        color="indigo"
                    />
                    <StatCard
                        icon={<MdPerson className="w-6 h-6" />}
                        title="Total Readers"
                        value={dashboardData.totalReaders}
                        color="green"
                    />
                    <StatCard
                        icon={<MdLibraryBooks className="w-6 h-6" />}
                        title="Books Lent Out"
                        value={dashboardData.booksLentOut}
                        color="yellow"
                    />
                    <StatCard
                        icon={<MdNotificationsActive className="w-6 h-6" />}
                        title="Overdue Books"
                        value={dashboardData.overdueBooks}
                        color="red"
                    />
                </div>

                {/* Quick Actions - Larger Cards */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <MdHistory className="mr-3 text-blue-500 text-2xl" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <MdMenuBook className="w-4 h-4 text-indigo-600" />,
                                text: "Manage Books",
                                description: "Add, edit or remove books from catalog",
                                path: "/manage-books",
                                color: "indigo"
                            },
                            {
                                icon: <MdPerson className="w-4 h-4 text-green-600" />,
                                text: "Add Reader",
                                description: "Register new library members",
                                path: "/dashboard/readers",
                                color: "green"
                            },
                            {
                                icon: <MdLibraryBooks className="w-4 h-4 text-yellow-600" />,
                                text: "Lend Book",
                                description: "Process book checkout",
                                path: "/manage-books",
                                color: "yellow"
                            },
                            {
                                icon: <MdAssignmentReturn className="w-4 h-4 text-purple-600" />,
                                text: "Mark Return",
                                description: "Record returned books",
                                path: "/dashboard/lendingList",
                                color: "purple"
                            },
                            {
                                icon: <MdNotificationsActive className="w-4 h-4 text-red-600" />,
                                text: "Overdue Reminder",
                                description: "Send overdue notifications",
                                path: "/dashboard/overdue",
                                color: "red"
                            },
                            {
                                icon: <MdHistory className="w-4 h-4 text-blue-600" />,
                                text: "Lending History",
                                description: "View all transactions",
                                path: "/dashboard/lendingList",
                                color: "blue"
                            },
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(action.path)}
                                className={`p-6 border border-gray-200 rounded-xl hover:bg-${action.color}-50 transition duration-200 flex flex-col items-start text-left`}
                            >
                                <div className={`p-3 rounded-lg bg-${action.color}-100 mb-4`}>
                                    {action.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">{action.text}</h4>
                                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
