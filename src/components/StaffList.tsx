import { useEffect, useState } from "react";
import { getAllStaff, deleteStaff, updateStaff } from "../services/authService";
import type { User } from "../types/User";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const StaffList = () => {
    const [staffList, setStaffList] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingStaff, setEditingStaff] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const navigate = useNavigate(); // ⬅️ Hook to navigate to other pages

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const data = await getAllStaff();
            setStaffList(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to load staff list");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this staff member?")) return;
        try {
            await deleteStaff(id);
            toast.success("Staff deleted successfully");
            fetchStaff();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete staff");
        }
    };

    const openEditModal = (staff: User) => {
        setEditingStaff(staff);
        setFormData({ ...staff });
    };

    const handleUpdate = async () => {
        if (!editingStaff) return;

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
            toast.success("Staff updated successfully");
            setEditingStaff(null);
            setProfileImage(null);
            fetchStaff();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update staff");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Staff Members</h2>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => navigate("/signup")} // ⬅️ Route to sign-up page
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add New Staff Member
                </button>
            </div>
            {loading ? (
                <p className="text-center">Loading staff list...</p>
            ) : staffList.length === 0 ? (
                <p>No staff records found.</p>
            ) : (
                <div className="grid gap-4">
                    {staffList.map((staff) => (
                        <div
                            key={staff._id}
                            className="border p-4 rounded flex justify-between items-center bg-white shadow"
                        >
                            <div>
                                <p><strong>Name:</strong> {staff.name}</p>
                                <p><strong>Email:</strong> {staff.email}</p>
                                <p><strong>Phone:</strong> {staff.phone || "N/A"}</p>
                                <p><strong>Role:</strong> {staff.role}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                {staff.profileImage && (
                                    <img
                                        src={staff.profileImage}
                                        className="w-16 h-16 rounded-full object-cover border"
                                    />
                                )}
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => openEditModal(staff)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(staff._id!)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {editingStaff && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
                        <h3 className="text-lg font-semibold mb-4">Edit Staff</h3>
                        <div className="grid gap-3">
                            <input
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                className="border px-3 py-2 rounded"
                                placeholder="Name"
                            />
                            <input
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="border px-3 py-2 rounded"
                                placeholder="Email"
                            />
                            <input
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleInputChange}
                                className="border px-3 py-2 rounded"
                                placeholder="Phone"
                            />
                            <input
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth || ""}
                                onChange={handleInputChange}
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setEditingStaff(null)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default StaffList;
