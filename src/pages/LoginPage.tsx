
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useAuth } from "../context/UseAuth";
import ChangePassword from "../components/ChangePassword";

const MySwal = withReactContent(Swal);

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const { login: authenticate } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            const errorMessages = Object.values(errors).filter(msg => msg).join("\n");
            if (errorMessages) {
                await MySwal.fire({
                    title: "Form Errors",
                    text: errorMessages,
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6366f1",
                });
            }
            return;
        }

        setIsLoading(true);
        try {
            const user = await login(formData);
            authenticate(user.accessToken);
        } catch (error) {
            let errorMessage = "Something went wrong";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            await MySwal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#6366f1",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleForgotPassword = () => {
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md mx-4">
                {/* Header Card */}
                <div className="bg-white rounded-t-2xl shadow-xl border-b border-gray-100 p-6 sm:p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-b-2xl shadow-xl p-6 sm:p-8">
                    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 sm:py-3 border ${
                                            errors.email
                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all duration-200`}
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                {errors.email && (
                                    <div className="flex items-center mt-2">
                                        <svg
                                            className="w-4 h-4 text-red-500 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            />
                                        </svg>
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 sm:py-3 border ${
                                            errors.password
                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all duration-200`}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && (
                                    <div className="flex items-center mt-2">
                                        <svg
                                            className="w-4 h-4 text-red-500 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            />
                                        </svg>
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading && (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                )}
                                {!isLoading ? "Sign in to Library" : "Signing in..."}
                            </button>
                        </div>

                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                                New to our library?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition-colors duration-200"
                                >
                                    Create your account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Change Password Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg relative w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold p-1"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <ChangePassword onClose={() => setShowModal(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;