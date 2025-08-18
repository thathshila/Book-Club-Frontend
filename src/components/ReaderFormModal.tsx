
import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import Swal from "sweetalert2";
import type { Reader } from "../pages/ManageReaderPage";

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
    const [errors, setErrors] = useState<Record<string, string>>({});

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.length > 100) {
            newErrors.name = "Name must be less than 100 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (phone && !/^[\d\s+-]{10,15}$/.test(phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!nic.trim()) {
            newErrors.nic = "NIC is required";
        } else if (!/^[0-9vVxX]+$/.test(nic)) {
            newErrors.nic = "Please enter a valid NIC number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const readerData = { name, email, phone, address, dateOfBirth, nic };

            if (isEdit && existingReader) {
                await apiClient.put(`/reader/${existingReader._id}`, readerData);
                Swal.fire({
                    title: "Success!",
                    text: "Reader updated successfully",
                    icon: "success",
                    confirmButtonColor: "#4f46e5",
                });
            } else {
                await apiClient.post(`/reader`, readerData);
                Swal.fire({
                    title: "Success!",
                    text: "Reader added successfully",
                    icon: "success",
                    confirmButtonColor: "#4f46e5",
                });
            }

            onClose();
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to save reader",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"} />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {isEdit ? "Edit Reader" : "Add Reader"}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(95vh-120px)] overflow-y-auto">
                    {/* Name Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none`}
                            placeholder="Enter full name"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                                setErrors(prev => ({ ...prev, name: "" }));
                            }}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none`}
                            placeholder="Enter email address"
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                                setErrors(prev => ({ ...prev, email: "" }));
                            }}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none`}
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={e => {
                                setPhone(e.target.value);
                                setErrors(prev => ({ ...prev, phone: "" }));
                            }}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Address Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none resize-none"
                            placeholder="Enter address"
                            rows={2}
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Date of Birth Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none"
                            type="date"
                            value={dateOfBirth}
                            onChange={e => setDateOfBirth(e.target.value)}
                        />
                    </div>

                    {/* NIC Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            NIC Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`w-full px-3 py-2 border ${errors.nic ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none`}
                            placeholder="Enter NIC number"
                            value={nic}
                            onChange={e => {
                                setNic(e.target.value);
                                setErrors(prev => ({ ...prev, nic: "" }));
                            }}
                            disabled={isEdit}
                        />
                        {errors.nic && <p className="mt-1 text-sm text-red-600">{errors.nic}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                        >
                            {isEdit ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReaderFormModal;