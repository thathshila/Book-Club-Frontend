// import React, { useState } from "react"
// import { Link } from "react-router-dom"
// import { login } from "../services/authService"
// import toast from "react-hot-toast"
// import axios from "axios"
// import { useAuth } from "../context/UseAuth"
//
// interface FormData {
//     email: string
//     password: string
// }
//
// interface FormErrors {
//     email?: string
//     password?: string
// }
//
// const Login = () => {
//     const [formData, setFormData] = useState<FormData>({
//         email: "",
//         password: "",
//     })
//     const [errors, setErrors] = useState<FormErrors>({})
//     const [isLoading, setIsLoading] = useState(false)
//     const { login: authenticate } = useAuth()
//
//     const validateForm = (): boolean => {
//         const newErrors: FormErrors = {}
//
//         // Email validation
//         if (!formData.email) {
//             newErrors.email = "Email is required"
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = "Please enter a valid email address"
//         }
//
//         if (!formData.password) {
//             newErrors.password = "Password is required"
//         } else if (formData.password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters"
//         }
//
//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         if (validateForm()) {
//             setIsLoading(true)
//             try {
//                 const user = await login(formData)
//                 toast.success(`Welcome, ${user.name}!`)
//                 authenticate(user.accessToken) // ✅ Let AuthProvider handle navigation
//             } catch (error) {
//                 if (axios.isAxiosError(error)) {
//                     toast.error(error.message)
//                 } else {
//                     toast.error("Something went wrong")
//                 }
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//     }
//
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }))
//
//         if (errors[name as keyof FormErrors]) {
//             setErrors((prev) => ({
//                 ...prev,
//                 [name]: undefined,
//             }))
//         }
//     }
//
//     return (
//         <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
//             <div className='max-w-md w-full space-y-8'>
//                 <div>
//                     <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
//                 </div>
//                 <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
//                     <div className='space-y-4'>
//                         <div>
//                             <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
//                                 Email address
//                             </label>
//                             <input
//                                 id='email'
//                                 name='email'
//                                 type='email'
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
//                                     errors.email ? "border-red-300" : "border-gray-300"
//                                 } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                                 placeholder='Enter your email'
//                             />
//                             {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
//                         </div>
//                         <div>
//                             <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
//                                 Password
//                             </label>
//                             <input
//                                 id='password'
//                                 name='password'
//                                 type='password'
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
//                                     errors.password ? "border-red-300" : "border-gray-300"
//                                 } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                                 placeholder='Enter your password'
//                             />
//                             {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password}</p>}
//                         </div>
//                     </div>
//
//                     <div>
//                         <button
//                             disabled={isLoading}
//                             type='submit'
//                             className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
//                         >
//                             {!isLoading ? "Sign in" : "Signing in..."}
//                         </button>
//                     </div>
//
//                     <div className='text-center'>
//                         <p className='text-sm text-gray-600'>
//                             Don't have an account?{" "}
//                             <Link
//                                 to='/signup'
//                                 className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
//                             >
//                                 Create new account
//                             </Link>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }
//
// export default Login
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../services/authService"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../context/UseAuth"

interface FormData {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const { login: authenticate } = useAuth()

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            try {
                const user = await login(formData)
                toast.success(`Welcome, ${user.name}!`)
                authenticate(user.accessToken) // ✅ Let AuthProvider handle navigation
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.message)
                } else {
                    toast.error("Something went wrong")
                }
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full'>
                {/* Header Card */}
                <div className='bg-white rounded-t-2xl shadow-xl border-b border-gray-100 p-8 text-center'>
                    <div className='mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4'>
                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                        </svg>
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 mb-2'>Library Portal</h2>
                    <p className='text-gray-600'>Welcome back to your digital library</p>
                </div>

                {/* Form Card */}
                <div className='bg-white rounded-b-2xl shadow-xl p-8'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='space-y-5'>
                            <div>
                                <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Email Address
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                                        </svg>
                                    </div>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border ${
                                            errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all duration-200`}
                                        placeholder='Enter your email address'
                                    />
                                </div>
                                {errors.email && (
                                    <div className='flex items-center mt-2'>
                                        <svg className='w-4 h-4 text-red-500 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' />
                                        </svg>
                                        <p className='text-sm text-red-600'>{errors.email}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Password
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                        </svg>
                                    </div>
                                    <input
                                        id='password'
                                        name='password'
                                        type='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border ${
                                            errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all duration-200`}
                                        placeholder='Enter your password'
                                    />
                                </div>
                                {errors.password && (
                                    <div className='flex items-center mt-2'>
                                        <svg className='w-4 h-4 text-red-500 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' />
                                        </svg>
                                        <p className='text-sm text-red-600'>{errors.password}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='pt-4'>
                            <button
                                disabled={isLoading}
                                type='submit'
                                className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
                            >
                                {isLoading && (
                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                )}
                                {!isLoading ? "Sign in to Library" : "Signing in..."}
                            </button>
                        </div>

                        <div className='text-center pt-4 border-t border-gray-100'>
                            <p className='text-sm text-gray-600'>
                                New to our library?{" "}
                                <Link
                                    to='/signup'
                                    className='font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition-colors duration-200'
                                >
                                    Create your account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login