
import { useEffect, useState } from "react";
import { getAllStaff, deleteStaff, updateStaff } from "../services/authService";
import type { User } from "../types/User";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const StaffList = () => {
    const [staffList, setStaffList] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingStaff, setEditingStaff] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const showSuccessAlert = (message: string) => {
        MySwal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#4f46e5',
        });
    };

    const showErrorAlert = (message: string) => {
        MySwal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#dc2626',
        });
    };

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const data = await getAllStaff();
            setStaffList(data);
        } catch (error: any) {
            showErrorAlert(error?.response?.data?.message || "Failed to load staff list");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            await deleteStaff(id);
            showSuccessAlert("Staff deleted successfully");
            fetchStaff();
        } catch (error: any) {
            showErrorAlert(error?.response?.data?.message || "Failed to delete staff");
        }
    };

    const openEditModal = (staff: User) => {
        setEditingStaff(staff);
        setFormData({ ...staff });
        setErrors({});
        setProfileImage(null);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length > 50) {
            newErrors.name = "Name must be less than 50 characters";
        }

        if (!formData.email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.phone && !/^[\d\s+-]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (profileImage && profileImage.size > 5 * 1024 * 1024) {
            newErrors.profileImage = "Image must be less than 5MB";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!editingStaff || !validateForm()) return;

        try {
            const updatedForm = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    updatedForm.append(key, value as string);
                }
            });
            if (profileImage) {
                updatedForm.append("profileImage", profileImage);
            }

            await updateStaff(editingStaff._id!, updatedForm);
            showSuccessAlert("Staff updated successfully");
            setEditingStaff(null);
            setProfileImage(null);
            fetchStaff();
        } catch (error: any) {
            showErrorAlert(error?.response?.data?.message || "Failed to update staff");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Staff Members</h2>
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-indigo-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Staff
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : staffList.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No staff members found</h3>
                    <p className="mt-1 text-gray-500">Get started by adding a new staff member</p>
                    <button
                        onClick={() => navigate("/signup")}
                        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Add Staff
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 divide-y">
                        {staffList.map((staff) => (
                            <div key={staff._id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        {staff.profileImage ? (
                                            <img
                                                src={staff.profileImage}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow"
                                                alt={staff.name}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                                {staff.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium text-gray-900">{staff.name}</h3>
                                            <p className="text-sm text-gray-500">{staff.email}</p>
                                            <div className="flex flex-wrap items-center mt-1 gap-2 sm:gap-3">
                                                {staff.phone && (
                                                    <span className="flex items-center text-sm text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        {staff.phone}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    {staff.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end sm:justify-normal space-x-2">
                                        <button
                                            onClick={() => openEditModal(staff)}
                                            className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors"
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(staff._id!)}
                                            className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingStaff && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">Edit Staff Member</h3>
                                <button
                                    onClick={() => setEditingStaff(null)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Full name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Email address"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Phone number"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        name="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                                    <div className="mt-1 flex items-center">
                                        <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span>Upload Image</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    setProfileImage(e.target.files?.[0] || null);
                                                    setErrors(prev => ({ ...prev, profileImage: "" }));
                                                }}
                                                className="sr-only"
                                            />
                                        </label>
                                        {profileImage && (
                                            <span className="ml-3 text-sm text-gray-500">{profileImage.name}</span>
                                        )}
                                    </div>
                                    {errors.profileImage && <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                                <button
                                    onClick={() => setEditingStaff(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffList;