// import { useEffect, useState } from "react";
// import { getAllStaff, deleteStaff, updateStaff } from "../services/authService";
// import type { User } from "../types/User";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";
//
// const StaffList = () => {
//     const [staffList, setStaffList] = useState<User[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [editingStaff, setEditingStaff] = useState<User | null>(null);
//     const [formData, setFormData] = useState<Partial<User>>({});
//     const [profileImage, setProfileImage] = useState<File | null>(null);
//     const navigate = useNavigate(); // ⬅️ Hook to navigate to other pages
//
//     const fetchStaff = async () => {
//         setLoading(true);
//         try {
//             const data = await getAllStaff();
//             setStaffList(data);
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Failed to load staff list");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this staff member?")) return;
//         try {
//             await deleteStaff(id);
//             toast.success("Staff deleted successfully");
//             fetchStaff();
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Failed to delete staff");
//         }
//     };
//
//     const openEditModal = (staff: User) => {
//         setEditingStaff(staff);
//         setFormData({ ...staff });
//     };
//
//     const handleUpdate = async () => {
//         if (!editingStaff) return;
//
//         try {
//             const updatedForm = new FormData();
//             Object.entries(formData).forEach(([key, value]) => {
//                 if (value !== undefined && value !== null) {
//                     updatedForm.append(key, value as string);
//                 }
//             });
//             if (profileImage) {
//                 updatedForm.append("profileImage", profileImage);
//             }
//
//             await updateStaff(editingStaff._id!, updatedForm);
//             toast.success("Staff updated successfully");
//             setEditingStaff(null);
//             setProfileImage(null);
//             fetchStaff();
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Failed to update staff");
//         }
//     };
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//
//     useEffect(() => {
//         fetchStaff();
//     }, []);
//
//     return (
//         <div className="max-w-4xl mx-auto mt-8">
//             <h2 className="text-xl font-bold mb-4">Staff Members</h2>
//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={() => navigate("/signup")} // ⬅️ Route to sign-up page
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     + Add New Staff Member
//                 </button>
//             </div>
//             {loading ? (
//                 <p className="text-center">Loading staff list...</p>
//             ) : staffList.length === 0 ? (
//                 <p>No staff records found.</p>
//             ) : (
//                 <div className="grid gap-4">
//                     {staffList.map((staff) => (
//                         <div
//                             key={staff._id}
//                             className="border p-4 rounded flex justify-between items-center bg-white shadow"
//                         >
//                             <div>
//                                 <p><strong>Name:</strong> {staff.name}</p>
//                                 <p><strong>Email:</strong> {staff.email}</p>
//                                 <p><strong>Phone:</strong> {staff.phone || "N/A"}</p>
//                                 <p><strong>Role:</strong> {staff.role}</p>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {staff.profileImage && (
//                                     <img
//                                         src={staff.profileImage}
//                                         className="w-16 h-16 rounded-full object-cover border"
//                                     />
//                                 )}
//                                 <div className="flex flex-col gap-1">
//                                     <button
//                                         onClick={() => openEditModal(staff)}
//                                         className="text-blue-500 hover:underline"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(staff._id!)}
//                                         className="text-red-500 hover:underline"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//
//             {/* Modal */}
//             {editingStaff && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
//                         <h3 className="text-lg font-semibold mb-4">Edit Staff</h3>
//                         <div className="grid gap-3">
//                             <input
//                                 name="name"
//                                 value={formData.name || ""}
//                                 onChange={handleInputChange}
//                                 className="border px-3 py-2 rounded"
//                                 placeholder="Name"
//                             />
//                             <input
//                                 name="email"
//                                 value={formData.email || ""}
//                                 onChange={handleInputChange}
//                                 className="border px-3 py-2 rounded"
//                                 placeholder="Email"
//                             />
//                             <input
//                                 name="phone"
//                                 value={formData.phone || ""}
//                                 onChange={handleInputChange}
//                                 className="border px-3 py-2 rounded"
//                                 placeholder="Phone"
//                             />
//                             <input
//                                 name="dateOfBirth"
//                                 type="date"
//                                 value={formData.dateOfBirth || ""}
//                                 onChange={handleInputChange}
//                                 className="border px-3 py-2 rounded"
//                             />
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
//                             />
//                         </div>
//                         <div className="mt-4 flex justify-end gap-2">
//                             <button
//                                 onClick={() => setEditingStaff(null)}
//                                 className="px-4 py-2 bg-gray-300 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleUpdate}
//                                 className="px-4 py-2 bg-green-600 text-white rounded"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//
//     );
// };
//
// export default StaffList;
import { useEffect, useState } from "react";
import { getAllStaff, deleteStaff, updateStaff } from "../services/authService";
import type { User } from "../types/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StaffList = () => {
    const [staffList, setStaffList] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingStaff, setEditingStaff] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const navigate = useNavigate();

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
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Staff Members</h2>
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
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
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
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
                            <div key={staff._id} className="p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {staff.profileImage ? (
                                            <img
                                                src={staff.profileImage}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                                                alt={staff.name}
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                                {staff.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium text-gray-900">{staff.name}</h3>
                                            <p className="text-sm text-gray-500">{staff.email}</p>
                                            <div className="flex items-center mt-1 space-x-3">
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
                                    <div className="flex space-x-2">
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Phone number"
                                    />
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
                                                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                                                className="sr-only"
                                            />
                                        </label>
                                        {profileImage && (
                                            <span className="ml-3 text-sm text-gray-500">{profileImage.name}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
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