import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import type {Reader} from "../pages/ManageReaderPage";

interface Props {
    onClose: () => void;
    existingReader?: Reader | null;
    isEdit: boolean;
}

const ReaderFormModal: React.FC<Props> = ({ onClose, existingReader, isEdit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nic, setNic] = useState("");

    useEffect(() => {
        if (existingReader) {
            setName(existingReader.name || "");
            setEmail(existingReader.email || "");
            setPhone(existingReader.phone || "");
            setAddress(existingReader.address || "");
            setDateOfBirth(existingReader.dateOfBirth ? existingReader.dateOfBirth.slice(0, 10) : "");
            setNic(existingReader.nic || "");
        }
    }, [existingReader]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const readerData = { name, email, phone, address, dateOfBirth, nic };

            if (isEdit && existingReader) {
                await apiClient.put(`/reader/${existingReader._id}`, readerData);
                toast.success("Reader updated successfully");
            } else {
                await apiClient.post("/reader", readerData);
                toast.success("Reader added successfully");
            }

            onClose();
        } catch {
            toast.error("Failed to save reader");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-96 space-y-4"
            >
                <h2 className="text-xl font-bold">
                    {isEdit ? "Edit Reader" : "Add Reader"}
                </h2>
                <input
                    className="border w-full p-2"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    className="border w-full p-2"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isEdit}
                />
                <input
                    className="border w-full p-2"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <input
                    className="border w-full p-2"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    className="border w-full p-2"
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                />
                <input
                    className="border w-full p-2"
                    placeholder="NIC"
                    value={nic}
                    onChange={e => setNic(e.target.value)}
                    required
                    disabled={isEdit}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        {isEdit ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReaderFormModal;
