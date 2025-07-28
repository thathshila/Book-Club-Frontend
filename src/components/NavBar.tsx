//
//
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { logout } from "../services/authService"
// import toast from "react-hot-toast"
// import axios from "axios"
// import { useAuth } from "../context/UseAuth"
//
// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const navigate = useNavigate()
//     const [isLoading, setIsLoading] = useState(false)
//     const { isLoggedIn, logout: unauthenticate } = useAuth()
//
//     console.log(isLoggedIn)
//
//     const handleLogin = () => {
//         console.log("Login")
//         navigate("/login")
//     }
//
//     const handleLogout = async () => {
//         setIsLoading(true)
//         try {
//             await logout()
//             toast.success("Logout successful!")
//             unauthenticate()
//             navigate("/login") // <-- navigate to login on success
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 toast.error(error.message)
//             } else {
//                 toast.error("Something went wrong")
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }
//
//     const handleDashboard = () => {
//         console.log("MainDashboard")
//         navigate("/dashboard")
//     }
//
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen)
//     }
//
//     return (
//         <nav className='bg-white shadow-lg border-b border-gray-200'>
//             <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//                 <div className='flex justify-between items-center h-16'>
//                     {/* Logo Section */}
//                     <div className='flex items-center'>
//                         <div className='flex-shrink-0'>
//                             <h1 className='text-2xl font-bold text-indigo-600'>📚 Book Club Hub</h1>
//                         </div>
//                     </div>
//
//                     {/* Desktop Navigation */}
//                     <div className='hidden md:flex items-center space-x-4'>
//                         {!isLoggedIn && (
//                             <button
//                                 onClick={handleLogin}
//                                 className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
//                             >
//                                 Login
//                             </button>
//                         )}
//
//                         {isLoggedIn && (
//                             <button
//                                 onClick={handleLogout}
//                                 className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
//                             >
//                                 Logout
//                             </button>
//                         )}
//
//                         {isLoggedIn && (
//                             <button
//                                 onClick={handleDashboard}
//                                 className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                             >
//                                 Dashboard
//                             </button>
//                         )}
//                     </div>
//
//                     {/* Mobile menu button */}
//                     <div className='md:hidden'>
//                         <button
//                             onClick={toggleMenu}
//                             className='text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600'
//                         >
//                             <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
//                                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Mobile Navigation Menu */}
//                 {isMenuOpen && (
//                     <div className='md:hidden'>
//                         <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200'>
//                             {!isLoggedIn && (
//                                 <button
//                                     onClick={handleLogin}
//                                     className='block w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium'
//                                 >
//                                     Login
//                                 </button>
//                             )}
//
//                             {isLoggedIn && (
//                                 <button
//                                     disabled={isLoading}
//                                     onClick={handleLogout}
//                                     className='block w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium'
//                                 >
//                                     {isLoading ? "Logging out..." : "Logout"}
//                                 </button>
//                             )}
//
//                             {isLoggedIn && (
//                                 <button
//                                     onClick={handleDashboard}
//                                     className='block w-full text-left bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium'
//                                 >
//                                     Dashboard
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     )
// }
//
// export default Navbar
//
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { logout } from "../services/authService"
// import toast from "react-hot-toast"
// import axios from "axios"
// import { useAuth } from "../context/UseAuth"
//
// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const navigate = useNavigate()
//     const [isLoading, setIsLoading] = useState(false)
//     const { isLoggedIn, logout: unauthenticate } = useAuth()
//
//     console.log(isLoggedIn)
//
//     const handleLogin = () => {
//         console.log("Login")
//         navigate("/login")
//     }
//
//     const handleLogout = async () => {
//         setIsLoading(true)
//         try {
//             await logout()
//             toast.success("Logout successful!")
//             unauthenticate()
//             navigate("/login") // <-- navigate to login on success
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 toast.error(error.message)
//             } else {
//                 toast.error("Something went wrong")
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }
//
//     const handleDashboard = () => {
//         console.log("MainDashboard")
//         navigate("/dashboard")
//     }
//
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen)
//     }
//
//     return (
//         <nav className='bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm'>
//             <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//                 <div className='flex justify-between items-center h-16'>
//                     {/* Logo Section */}
//                     <div className='flex items-center group'>
//                         <div className='flex-shrink-0'>
//                             <div className='flex items-center space-x-3'>
//                                 <div className='w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110'>
//                                     <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h1 className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
//                                         Digital Library
//                                     </h1>
//                                     <p className='text-xs text-gray-500 font-medium'>Management System</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Desktop Navigation */}
//                     <div className='hidden md:flex items-center space-x-3'>
//                         {!isLoggedIn && (
//                             <button
//                                 onClick={handleLogin}
//                                 className='group relative px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105 hover:shadow-lg'
//                             >
//                                 <span className='flex items-center space-x-2'>
//                                     <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
//                                     </svg>
//                                     <span>Sign In</span>
//                                 </span>
//                             </button>
//                         )}
//
//                         {isLoggedIn && (
//                             <>
//                                 <button
//                                     onClick={handleDashboard}
//                                     className='group relative px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform transition-all duration-200 hover:scale-105'
//                                 >
//                                     <span className='flex items-center space-x-2'>
//                                         <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
//                                         </svg>
//                                         <span>Dashboard</span>
//                                     </span>
//                                 </button>
//
//                                 <button
//                                     disabled={isLoading}
//                                     onClick={handleLogout}
//                                     className='group relative px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
//                                 >
//                                     <span className='flex items-center space-x-2'>
//                                         {isLoading ? (
//                                             <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
//                                                 <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
//                                                 <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
//                                             </svg>
//                                         ) : (
//                                             <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
//                                             </svg>
//                                         )}
//                                         <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
//                                     </span>
//                                 </button>
//                             </>
//                         )}
//                     </div>
//
//                     {/* Mobile menu button */}
//                     <div className='md:hidden'>
//                         <button
//                             onClick={toggleMenu}
//                             className='group relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
//                         >
//                             <span className='sr-only'>Open main menu</span>
//                             <div className='w-6 h-6 relative'>
//                                 <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}`}></span>
//                                 <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 translate-y-2 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
//                                 <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'}`}></span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Mobile Navigation Menu */}
//                 <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//                     <div className='px-2 pt-4 pb-3 space-y-3 border-t border-gray-200/50'>
//                         {!isLoggedIn && (
//                             <button
//                                 onClick={handleLogin}
//                                 className='group w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02]'
//                             >
//                                 <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
//                                 </svg>
//                                 <span>Sign In</span>
//                             </button>
//                         )}
//
//                         {isLoggedIn && (
//                             <>
//                                 <button
//                                     onClick={handleDashboard}
//                                     className='group w-full flex items-center space-x-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transform transition-all duration-200 hover:scale-[1.02]'
//                                 >
//                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
//                                     </svg>
//                                     <span>Dashboard</span>
//                                 </button>
//
//                                 <button
//                                     disabled={isLoading}
//                                     onClick={handleLogout}
//                                     className='group w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
//                                 >
//                                     {isLoading ? (
//                                         <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
//                                             <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
//                                             <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
//                                         </svg>
//                                     ) : (
//                                         <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
//                                         </svg>
//                                     )}
//                                     <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }
//
// export default Navbar

//
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { logout } from "../services/authService"
// import toast from "react-hot-toast"
// import axios from "axios"
// import { useAuth } from "../context/UseAuth"
//
// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const navigate = useNavigate()
//     const [isLoading, setIsLoading] = useState(false)
//     const { isLoggedIn, logout: unauthenticate } = useAuth()
//
//     console.log(isLoggedIn)
//
//     const handleLogin = () => {
//         console.log("Login")
//         navigate("/login")
//     }
//
//     const handleLogout = async () => {
//         setIsLoading(true)
//         try {
//             await logout()
//             toast.success("Logout successful!")
//             unauthenticate()
//             navigate("/login") // <-- navigate to login on success
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 toast.error(error.message)
//             } else {
//                 toast.error("Something went wrong")
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }
//
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen)
//     }
//
//     return (
//         <nav className='bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm'>
//             <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//                 <div className='flex justify-between items-center h-16'>
//                     {/* Logo Section */}
//                     <div className='flex items-center group'>
//                         <div className='flex-shrink-0'>
//                             <div className='flex items-center space-x-3'>
//                                 <div className='w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110'>
//                                     <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h1 className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
//                                         Digital Library
//                                     </h1>
//                                     <p className='text-xs text-gray-500 font-medium'>Management System</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Desktop Navigation */}
//                     <div className='hidden md:flex items-center space-x-3'>
//                         {!isLoggedIn && (
//                             <button
//                                 onClick={handleLogin}
//                                 className='group relative px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105 hover:shadow-lg'
//                             >
//                                 <span className='flex items-center space-x-2'>
//                                     <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
//                                     </svg>
//                                     <span>Sign In</span>
//                                 </span>
//                             </button>
//                         )}
//
//                         {isLoggedIn && (
//                             <button
//                                 disabled={isLoading}
//                                 onClick={handleLogout}
//                                 className='group relative px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
//                             >
//                                 <span className='flex items-center space-x-2'>
//                                     {isLoading ? (
//                                         <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
//                                             <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
//                                             <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
//                                         </svg>
//                                     ) : (
//                                         <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
//                                         </svg>
//                                     )}
//                                     <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
//                                 </span>
//                             </button>
//                         )}
//                     </div>
//
//                     {/* Mobile menu button */}
//                     <div className='md:hidden'>
//                         <button
//                             onClick={toggleMenu}
//                             className='group relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
//                         >
//                             <span className='sr-only'>Open main menu</span>
//                             <div className='w-6 h-6 relative'>
//                                 <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}`}></span>
//                                 <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 translate-y-2 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
//                                 <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'}`}></span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Mobile Navigation Menu */}
//                 <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//                     <div className='px-2 pt-4 pb-3 space-y-3 border-t border-gray-200/50'>
//                         {!isLoggedIn && (
//                             <button
//                                 onClick={handleLogin}
//                                 className='group w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02]'
//                             >
//                                 <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
//                                 </svg>
//                                 <span>Sign In</span>
//                             </button>
//                         )}
//
//                         {isLoggedIn && (
//                             <button
//                                 disabled={isLoading}
//                                 onClick={handleLogout}
//                                 className='group w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
//                             >
//                                 {isLoading ? (
//                                     <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
//                                         <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
//                                         <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
//                                     </svg>
//                                 ) : (
//                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
//                                     </svg>
//                                 )}
//                                 <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }
//
// export default Navbar

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../context/UseAuth";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, logout: unauthenticate } = useAuth();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Confirm Logout',
            text: "Are you sure you want to sign out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, sign out'
        });

        if (!result.isConfirmed) return;

        setIsLoading(true);
        try {
            await logout();
            Swal.fire({
                title: 'Success',
                text: "You have been signed out successfully",
                icon: 'success',
                confirmButtonColor: '#4f46e5',
            });
            unauthenticate();
            navigate("/login");
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: axios.isAxiosError(error) ? error.message : "Something went wrong",
                icon: 'error',
                confirmButtonColor: '#4f46e5',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo Section */}
                    <div className='flex items-center group'>
                        <div className='flex-shrink-0'>
                            <div
                                className='flex items-center space-x-3 cursor-pointer'
                                onClick={() => navigate('/')}
                            >
                                <div className='w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110'>
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                                        Digital Library
                                    </h1>
                                    <p className='text-xs text-gray-500 font-medium hidden sm:block'>Management System</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {!isLoggedIn ? (
                            <button
                                onClick={handleLogin}
                                className='group relative px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:scale-105 hover:shadow-md'
                            >
                                <span className='flex items-center space-x-2 text-sm sm:text-base'>
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                                    </svg>
                                    <span>Sign In</span>
                                </span>
                            </button>
                        ) : (
                            <button
                                disabled={isLoading}
                                onClick={handleLogout}
                                className='group relative px-4 sm:px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                            >
                                <span className='flex items-center space-x-2 text-sm sm:text-base'>
                                    {isLoading ? (
                                        <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                        </svg>
                                    ) : (
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                        </svg>
                                    )}
                                    <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden flex items-center'>
                        <button
                            onClick={toggleMenu}
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200'
                            aria-expanded={isMenuOpen}
                        >
                            <span className='sr-only'>Open main menu</span>
                            <svg
                                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className='px-2 pt-2 pb-3 space-y-2 border-t border-gray-200/50'>
                    {!isLoggedIn ? (
                        <button
                            onClick={handleLogin}
                            className='w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                            </svg>
                            <span>Sign In</span>
                        </button>
                    ) : (
                        <button
                            disabled={isLoading}
                            onClick={handleLogout}
                            className='w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? (
                                <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                            ) : (
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                </svg>
                            )}
                            <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;