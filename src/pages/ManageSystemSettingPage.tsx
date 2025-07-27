import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getLoggedInUser,
    updateStaff,
    sendOtp,
    verifyOtp,
    resetPassword,
} from "../services/authService";
import type { User } from "../types/User";

const ManageSystemSettingPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [editing, setEditing] = useState(false);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "password">("email");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getLoggedInUser();
                setUser(data);
                setEmail(data.email);
            } catch (error) {
                toast.error("Failed to load user details");
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFormData = formData || new FormData();
        updatedFormData.set(e.target.name, e.target.value);
        setFormData(updatedFormData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const updatedFormData = formData || new FormData();
            updatedFormData.set("profileImage", file);
            setFormData(updatedFormData);
        }
    };

    const handleUpdate = async () => {
        if (!user || !formData) return;
        try {
            const updated = await updateStaff(user._id, formData);
            setUser(updated);
            toast.success("Profile updated");
            setEditing(false);
        } catch {
            toast.error("Update failed");
        }
    };

    const handlePasswordReset = async () => {
        try {
            if (step === "email") {
                await sendOtp(email);
                toast.success("OTP sent");
                setStep("otp");
            } else if (step === "otp") {
                await verifyOtp(email, otp);
                toast.success("OTP verified");
                setStep("password");
            } else if (step === "password") {
                await resetPassword(email, otp, newPassword);
                toast.success("Password updated");
                setStep("email");
                setOtp("");
                setNewPassword("");
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    if (!user) return <div className="text-center mt-10">Loading user details...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold">Manage System Settings</h2>

            {!editing ? (
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Date of Birth:</strong> {user.dateOfBirth?.slice(0, 10)}</p>
                    {user.profileImage && (
                        <img src={user.profileImage} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
                    )}
                    <button className="btn btn-primary mt-2" onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <div className="space-y-3">
                    <input type="text" name="name" placeholder="Name" defaultValue={user.name} onChange={handleChange} className="input input-bordered w-full" />
                    <input type="text" name="phone" placeholder="Phone" defaultValue={user.phone} onChange={handleChange} className="input input-bordered w-full" />
                    <input type="text" name="address" placeholder="Address" defaultValue={user.address} onChange={handleChange} className="input input-bordered w-full" />
                    <input type="date" name="dateOfBirth" defaultValue={user.dateOfBirth?.slice(0, 10)} onChange={handleChange} className="input input-bordered w-full" />
                    <input type="file" name="profileImage" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                    <div className="flex gap-2 mt-2">
                        <button className="btn btn-success" onClick={handleUpdate}>Save</button>
                        <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Password Reset Section */}
            <div className="pt-6 border-t mt-6">
                <h3 className="font-semibold text-lg mb-2">Change Password</h3>
                {step === "email" && (
                    <button className="btn btn-warning" onClick={handlePasswordReset}>Send OTP</button>
                )}
                {step === "otp" && (
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button className="btn btn-warning" onClick={handlePasswordReset}>Verify OTP</button>
                    </div>
                )}
                {step === "password" && (
                    <div className="space-y-2">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button className="btn btn-success" onClick={handlePasswordReset}>Reset Password</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageSystemSettingPage;
