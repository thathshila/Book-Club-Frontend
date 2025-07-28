import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
    getLoggedInUser,
    updateStaff,
    sendOtp,
    verifyOtp,
    resetPassword,
} from "../services/authService";
import type { User } from "../types/User";

const MySwal = withReactContent(Swal);

const ManageSystemSettingPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getLoggedInUser();
                setUser(data);
                setEmail(data.email || "");
            } catch (error) {
                await MySwal.fire({
                    title: "Error!",
                    text: "Failed to load user details",
                    icon: "error",
                    confirmButtonColor: "#3b82f6",
                });
            } finally {
                setLoading(false);
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

            // Preview the selected image
            const reader = new FileReader();
            reader.onload = (event) => {
                if (user) {
                    setUser({ ...user, profileImage: event.target?.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const startEditing = () => {
        const initialFormData = new FormData();
        if (user) {
            initialFormData.set('name', user.name || '');
            initialFormData.set('phone', user.phone || '');
            initialFormData.set('dateOfBirth', user.dateOfBirth || '');
            initialFormData.set('address', user.address || '');
        }
        setFormData(initialFormData);
        setEditing(true);
    };

    const handleUpdate = async () => {
        if (!user || !formData) return;
        try {
            await updateStaff(user._id, formData);
            const refreshed = await getLoggedInUser(); // 🔁 Fetch latest from DB
            setUser(refreshed);
            setFormData(null);
            await MySwal.fire({
                title: "Success!",
                text: "Profile updated successfully",
                icon: "success",
                confirmButtonColor: "#3b82f6",
            });
            setEditing(false);
        } catch (error) {
            console.error("Update error:", error);
            await MySwal.fire({
                title: "Error!",
                text: "Failed to update profile",
                icon: "error",
                confirmButtonColor: "#3b82f6",
            });
        }
    };


    const handlePasswordReset = async () => {
        try {
            if (step === "email") {
                await sendOtp(email);
                await MySwal.fire({
                    title: "OTP Sent!",
                    text: "Verification code has been sent to your email",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                setStep("otp");
            } else if (step === "otp") {
                await verifyOtp(email, otp);
                await MySwal.fire({
                    title: "Verified!",
                    text: "OTP verified successfully",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                setStep("password");
            } else if (step === "password") {
                if (newPassword.length < 8) {
                    await MySwal.fire({
                        title: "Error!",
                        text: "Password must be at least 8 characters",
                        icon: "error",
                        confirmButtonColor: "#10b981",
                    });
                    return;
                }

                await resetPassword(email, otp, newPassword);
                await MySwal.fire({
                    title: "Success!",
                    text: "Password updated successfully",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                setStep("email");
                setOtp("");
                setNewPassword("");
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            await MySwal.fire({
                title: "Error!",
                text: message,
                icon: "error",
                confirmButtonColor: step === "email" ? "#3b82f6" : "#10b981",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">User Not Found</h2>
                    <p className="text-gray-600">Unable to load user details. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Settings</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage your account details and security settings
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile Information
                        </h2>
                    </div>

                    <div className="px-4 sm:px-6 py-4">
                        {!editing ? (
                            <div className="space-y-4">
                                <div className="flex flex-col items-center mb-4 sm:mb-6">
                                    {user.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-100"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl sm:text-4xl text-gray-500">
                                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="mt-1 text-sm sm:text-base text-gray-900">{user.name || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-500">Email</label>
                                        <p className="mt-1 text-sm sm:text-base text-gray-900">{user.email || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-500">Phone</label>
                                        <p className="mt-1 text-sm sm:text-base text-gray-900">{user.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-500">Date of Birth</label>
                                        <p className="mt-1 text-sm sm:text-base text-gray-900">
                                            {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-500">Address</label>
                                        <p className="mt-1 text-sm sm:text-base text-gray-900">{user.address || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={startEditing}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-col items-center mb-4 sm:mb-6">
                                    <label className="relative cursor-pointer">
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt="Profile"
                                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-100"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl sm:text-4xl text-gray-500">
                                                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="file"
                                            name="profileImage"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            defaultValue={user.name || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            defaultValue={user.phone || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-xs sm:text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            defaultValue={user.dateOfBirth?.slice(0, 10) || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            defaultValue={user.address || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                                    <button
                                        onClick={() => setEditing(false)}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Password Reset Card */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Password Settings
                        </h2>
                    </div>

                    <div className="px-4 sm:px-6 py-4">
                        <div className="space-y-4">
                            {step === "email" && (
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                        To change your password, we'll send a verification code to your email address.
                                    </p>
                                    <button
                                        onClick={handlePasswordReset}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Send Verification Code
                                    </button>
                                </div>
                            )}

                            {step === "otp" && (
                                <div className="space-y-4">
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        We've sent a 6-digit verification code to <span className="font-medium">{email}</span>. Please enter it below.
                                    </p>
                                    <div>
                                        <label htmlFor="otp" className="block text-xs sm:text-sm font-medium text-gray-700">Verification Code</label>
                                        <input
                                            type="text"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                            placeholder="Enter 6-digit code"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handlePasswordReset}
                                            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Verify Code
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === "password" && (
                                <div className="space-y-4">
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Please enter your new password. Make sure it's at least 8 characters long.
                                    </p>
                                    <div>
                                        <label htmlFor="newPassword" className="block text-xs sm:text-sm font-medium text-gray-700">New Password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                                        <button
                                            onClick={() => setStep("email")}
                                            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePasswordReset}
                                            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageSystemSettingPage;