import { useEffect, useState } from "react";
import { getAllStaff } from "../services/authService.ts";
import type { User } from "../types/User";
import toast from "react-hot-toast";

const StaffList = () => {
    const [staffList, setStaffList] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        fetchStaff();
    }, []);

    if (loading) return <p className="text-center mt-6">Loading staff list...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Staff Members</h2>
            {staffList.length === 0 ? (
                <p className="text-gray-600">No staff records found.</p>
            ) : (
                <div className="grid gap-4">
                    {staffList.map((staff) => (
                        <div
                           // key={staff}
                            className="border p-4 rounded flex justify-between items-center bg-white shadow"
                        >
                            <div className="space-y-1">
                                <p>
                                    <strong>Name:</strong> {staff.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {staff.email}
                                </p>
                                <p>
                                    <strong>Role:</strong>{" "}
                                    <span className="capitalize">{staff.role}</span>
                                </p>
                                <p>
                                    <strong>Phone:</strong> {staff.phone || "N/A"}
                                </p>
                                <p>
                                    <strong>DOB:</strong>{" "}
                                    {staff.dateOfBirth
                                        ? new Date(staff.dateOfBirth).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>
                            {staff.profileImage && (
                                <img
                                    src={staff.profileImage}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StaffList;
