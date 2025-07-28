
import React, { useEffect, useState } from "react";
import ReaderFormModal from "../components/ReaderFormModal";
import apiClient from "../services/apiClient";
import Swal from "sweetalert2";
import ReaderTable from "../components/ReaderTable.tsx";

export interface Reader {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    memberId?: string;
    nic?: string;
    createdAt?: string;
    isActive?: boolean;
}

const ManageReaders: React.FC = () => {
    const [readers, setReaders] = useState<Reader[]>([]);
    const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useState({
        name: "",
        email: "",
        phone: "",
        nic: "",
    });

    const fetchReaders = async () => {
        setIsLoading(true);
        try {
            const res = await apiClient.get("/reader");
            setReaders(res.data);
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to fetch readers",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReaders();
    }, []);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams(searchParams).toString();
            const res = await apiClient.get(`/reader/filter?${query}`);
            setReaders(res.data);
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to search readers",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedReader(null);
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleEdit = (reader: Reader) => {
        setSelectedReader(reader);
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await apiClient.delete(`/reader/${id}`);
            Swal.fire({
                title: "Deleted!",
                text: "Reader deleted successfully",
                icon: "success",
                confirmButtonColor: "#4f46e5",
            });
            fetchReaders();
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to delete reader",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchReaders();
    };

    const clearFilters = () => {
        setSearchParams({ name: "", email: "", phone: "", nic: "" });
        fetchReaders();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Manage Readers</h1>
                            <p className="text-gray-600">Library member management</p>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Add New Reader</span>
                        </button>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Search Readers</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchParams.name}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="text"
                                placeholder="Search by email..."
                                value={searchParams.email}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                placeholder="Search by phone..."
                                value={searchParams.phone}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                            <input
                                type="text"
                                placeholder="Search by NIC..."
                                value={searchParams.nic}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, nic: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Search</span>
                        </button>

                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Clear</span>
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Reader Table */}
                {!isLoading && <ReaderTable readers={readers} onEdit={handleEdit} onDelete={handleDelete} />}

                {/* Modal */}
                {isModalOpen && (
                    <ReaderFormModal
                        onClose={handleModalClose}
                        existingReader={selectedReader}
                        isEdit={isEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default ManageReaders;