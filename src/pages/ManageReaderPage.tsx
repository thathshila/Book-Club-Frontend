
import React, { useEffect, useState } from "react";
import ReaderFormModal from "../components/ReaderFormModal";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
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

    const [searchParams, setSearchParams] = useState({
        name: "",
        email: "",
        phone: "",
        nic: "",
    });

    const fetchReaders = async () => {
        try {
            const res = await apiClient.get("/reader");
            setReaders(res.data);
        } catch {
            toast.error("Failed to fetch readers");
        }
    };

    useEffect(() => {
        fetchReaders();
    }, []);

    const handleSearch = async () => {
        try {
            const query = new URLSearchParams(searchParams).toString();
            const res = await apiClient.get(`/reader/filter?${query}`);
            setReaders(res.data);
        } catch {
            toast.error("Failed to search readers");
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
        if (!window.confirm("Are you sure you want to delete this reader?")) return;
        try {
            await apiClient.delete(`/reader/${id}`);
            toast.success("Reader deleted successfully");
            fetchReaders();
        } catch {
            toast.error("Failed to delete reader");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchReaders();
    };

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Readers</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Add Reader
                </button>
            </div>

            {/* Search Filters */}
            <div className="bg-white p-4 rounded shadow space-y-2">
                <h3 className="text-lg font-semibold">Search Readers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {["name", "email", "phone", "nic"].map((field) => (
                        <input
                            key={field}
                            type="text"
                            placeholder={`Search by ${field}`}
                            value={searchParams[field as keyof typeof searchParams]}
                            onChange={(e) =>
                                setSearchParams((prev) => ({
                                    ...prev,
                                    [field]: e.target.value
                                }))
                            }
                            className="border border-gray-300 rounded p-2"
                        />
                    ))}
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Search
                </button>
            </div>

            <ReaderTable readers={readers} onEdit={handleEdit} onDelete={handleDelete} />

            {isModalOpen && (
                <ReaderFormModal
                    onClose={handleModalClose}
                    existingReader={selectedReader}
                    isEdit={isEdit}
                />
            )}
        </div>
    );
};

export default ManageReaders;
