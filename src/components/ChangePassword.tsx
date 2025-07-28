//
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { sendOtp, verifyOtp, resetPassword } from "../services/authService";
//
// const ChangePassword = ({ onClose }: { onClose?: () => void }) => {
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [step, setStep] = useState<"email" | "otp" | "reset">("email");
//     const [isLoading, setIsLoading] = useState(false);
//
//     const handleSendOtp = async () => {
//         try {
//             setIsLoading(true);
//             await sendOtp(email);
//             toast.success("OTP sent to your email");
//             setStep("otp");
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Error sending OTP");
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         try {
//             setIsLoading(true);
//             await verifyOtp(email, otp);
//             toast.success("OTP verified");
//             setStep("reset");
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Invalid OTP");
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleResetPassword = async () => {
//         try {
//             setIsLoading(true);
//             await resetPassword(email, otp, newPassword);
//             toast.success("Password reset successful");
//
//             setTimeout(() => {
//                 onClose?.(); // ✅ close the modal
//             }, 1000);
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Failed to reset password");
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
//             <h2 className="text-xl font-bold text-center mb-6">Reset Password</h2>
//
//             {step === "email" && (
//                 <>
//                     <label className="block mb-2">Email</label>
//                     <input
//                         type="email"
//                         className="w-full border px-4 py-2 rounded mb-4"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your registered email"
//                         required
//                     />
//                     <button
//                         type="button"
//                         className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
//                         onClick={handleSendOtp}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Sending OTP..." : "Send OTP"}
//                     </button>
//                 </>
//             )}
//
//             {step === "otp" && (
//                 <>
//                     <label className="block mb-2">OTP</label>
//                     <input
//                         type="text"
//                         className="w-full border px-4 py-2 rounded mb-4"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         placeholder="Enter OTP"
//                         required
//                     />
//                     <button
//                         type="button"
//                         className="bg-green-600 text-white px-4 py-2 rounded w-full"
//                         onClick={handleVerifyOtp}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Verifying OTP..." : "Verify OTP"}
//                     </button>
//                 </>
//             )}
//
//             {step === "reset" && (
//                 <>
//                     <label className="block mb-2">New Password</label>
//                     <input
//                         type="password"
//                         className="w-full border px-4 py-2 rounded mb-4"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         placeholder="Enter new password"
//                         required
//                     />
//                     <button
//                         type="button"
//                         className="bg-purple-600 text-white px-4 py-2 rounded w-full"
//                         onClick={handleResetPassword}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Resetting Password..." : "Reset Password"}
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default ChangePassword;


import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { sendOtp, verifyOtp, resetPassword } from "../services/authService";

const MySwal = withReactContent(Swal);

const ChangePassword = ({ onClose }: { onClose?: () => void }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });

    const validateEmail = () => {
        let isValid = true;
        const newErrors = { ...errors, email: "" };

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateOtp = () => {
        let isValid = true;
        const newErrors = { ...errors, otp: "" };

        if (!otp.trim()) {
            newErrors.otp = "OTP is required";
            isValid = false;
        } else if (!/^\d{6}$/.test(otp)) {
            newErrors.otp = "OTP must be 6 digits";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validatePassword = () => {
        let isValid = true;
        const newErrors = {
            ...errors,
            newPassword: "",
            confirmPassword: ""
        };

        if (!newPassword) {
            newErrors.newPassword = "Password is required";
            isValid = false;
        } else if (newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const showSuccessAlert = (message: string) => {
        MySwal.fire({
            title: <p className="text-xl font-bold">Success!</p>,
            html: <p className="text-gray-700">{message}</p>,
            icon: "success",
            confirmButtonColor: "#4f46e5",
            confirmButtonText: "OK",
            background: "#ffffff",
            customClass: {
                container: "text-sm sm:text-base"
            }
        });
    };

    const showErrorAlert = (message: string) => {
        MySwal.fire({
            title: <p className="text-xl font-bold">Error!</p>,
            html: <p className="text-gray-700">{message}</p>,
            icon: "error",
            confirmButtonColor: "#dc2626",
            confirmButtonText: "Try Again",
            background: "#ffffff",
            customClass: {
                container: "text-sm sm:text-base"
            }
        });
    };

    const handleSendOtp = async () => {
        if (!validateEmail()) return;

        try {
            setIsLoading(true);
            await sendOtp(email);
            showSuccessAlert("OTP has been sent to your email address");
            setStep("otp");
        } catch (err: any) {
            showErrorAlert(err.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!validateOtp()) return;

        try {
            setIsLoading(true);
            await verifyOtp(email, otp);
            showSuccessAlert("OTP verified successfully");
            setStep("reset");
        } catch (err: any) {
            showErrorAlert(err.response?.data?.message || "Invalid OTP. Please check and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!validatePassword()) return;

        try {
            setIsLoading(true);
            await resetPassword(email, otp, newPassword);
            showSuccessAlert("Your password has been reset successfully!");

            MySwal.fire({
                title: <p className="text-xl font-bold">Success!</p>,
                html: <p className="text-gray-700">You can now login with your new password</p>,
                icon: "success",
                confirmButtonColor: "#4f46e5",
                confirmButtonText: "Continue",
                background: "#ffffff",
                willClose: () => {
                    onClose?.();
                }
            });
        } catch (err: any) {
            showErrorAlert(err.response?.data?.message || "Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 sm:mt-10 bg-white p-4 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
                Reset Password
            </h2>

            <div className="space-y-4">
                {step === "email" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-indigo-500"
                                }`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors({ ...errors, email: "" });
                                }}
                                placeholder="Enter your registered email"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-start">
                                    <svg
                                        className="h-4 w-4 mr-1 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSendOtp}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending OTP...
                                </span>
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </div>
                )}

                {step === "otp" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                                OTP (6-digit code)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.otp
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-indigo-500"
                                }`}
                                value={otp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                                    setOtp(value);
                                    setErrors({ ...errors, otp: "" });
                                }}
                                placeholder="Enter 6-digit OTP"
                                required
                            />
                            {errors.otp && (
                                <p className="mt-1 text-sm text-red-600 flex items-start">
                                    <svg
                                        className="h-4 w-4 mr-1 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.otp}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleVerifyOtp}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Verifying OTP...
                                </span>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>

                        <button
                            type="button"
                            className="w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out focus:outline-none"
                            onClick={() => {
                                setStep("email");
                                setOtp("");
                            }}
                            disabled={isLoading}
                        >
                            Back to Email
                        </button>
                    </div>
                )}

                {step === "reset" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.newPassword
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-indigo-500"
                                }`}
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setErrors({ ...errors, newPassword: "" });
                                }}
                                placeholder="Enter new password (min 8 characters)"
                                required
                            />
                            {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-start">
                                    <svg
                                        className="h-4 w-4 mr-1 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.confirmPassword
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-indigo-500"
                                }`}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrors({ ...errors, confirmPassword: "" });
                                }}
                                placeholder="Confirm your new password"
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-start">
                                    <svg
                                        className="h-4 w-4 mr-1 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleResetPassword}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Resetting Password...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>

                        <button
                            type="button"
                            className="w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out focus:outline-none"
                            onClick={() => {
                                setStep("otp");
                                setNewPassword("");
                                setConfirmPassword("");
                            }}
                            disabled={isLoading}
                        >
                            Back to OTP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;