// import { useState } from "react";
// import toast from "react-hot-toast";
// import { sendOtp, verifyOtp, resetPassword } from "../services/authService";
//
// const ChangePassword = () => {
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
//             setStep("email");
//             setEmail("");
//             setOtp("");
//             setNewPassword("");
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Failed to reset password");
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
//             <h2 className="text-xl font-bold text-center mb-6">Change Password</h2>
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp, resetPassword } from "../services/authService";

const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // ✅ for redirection

    const handleSendOtp = async () => {
        try {
            setIsLoading(true);
            await sendOtp(email);
            toast.success("OTP sent to your email");
            setStep("otp");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error sending OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setIsLoading(true);
            await verifyOtp(email, otp);
            toast.success("OTP verified");
            setStep("reset");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            setIsLoading(true);
            await resetPassword(email, otp, newPassword);
            toast.success("Password reset successful");

            // ✅ Redirect to login page after successful reset
            setTimeout(() => {
                navigate("/login");
            }, 1000); // optional delay for better UX
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
            <h2 className="text-xl font-bold text-center mb-6">Reset Password</h2>

            {step === "email" && (
                <>
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full border px-4 py-2 rounded mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        required
                    />
                    <button
                        type="button"
                        className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </>
            )}

            {step === "otp" && (
                <>
                    <label className="block mb-2">OTP</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded mb-4"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                    />
                    <button
                        type="button"
                        className="bg-green-600 text-white px-4 py-2 rounded w-full"
                        onClick={handleVerifyOtp}
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying OTP..." : "Verify OTP"}
                    </button>
                </>
            )}

            {step === "reset" && (
                <>
                    <label className="block mb-2">New Password</label>
                    <input
                        type="password"
                        className="w-full border px-4 py-2 rounded mb-4"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                    <button
                        type="button"
                        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
                        onClick={handleResetPassword}
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting Password..." : "Reset Password"}
                    </button>
                </>
            )}
        </div>
    );
};

export default ChangePassword;
