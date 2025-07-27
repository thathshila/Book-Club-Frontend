import React, { useState, type JSX } from "react"
import {
    MdDashboard,
    MdPeople,
    MdMenuBook,
    MdSupervisorAccount,
    MdLibraryBooks,
    MdSchedule,
    MdNotifications,
    MdSettings
} from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/UseAuth" // Import the useAuth hook

interface SidebarItem {
    id: string
    label: string
    icon: JSX.Element
    requiredRole?: "librarian" // Optional field to specify role requirement
}

const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>("dashboard")
    const navigate = useNavigate()
    const { user } = useAuth() // Get the current user from auth context

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        if (itemId === "dashboard") navigate(`/dashboard`);
        else if (itemId === "lendings") navigate(`/dashboard/lendings`);
        else if (itemId === "readers") navigate(`/dashboard/readers`);
        else if (itemId === "books") navigate(`/manage-books`);
        else if (itemId === "staff") navigate(`/staff`);
        else if (itemId === "manage-overdue") navigate(`/manage-overdue`)
        else if (itemId === "system-setting") navigate(`/system-setting`)
        else navigate(`/dashboard/${itemId}`);
    };

    const allSidebarItems: SidebarItem[] = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <MdDashboard className='w-5 h-5' />,
        },
        {
            id: "readers",
            label: "Manage Readers",
            icon: <MdPeople className='w-5 h-5' />,
        },
        {
            id: "books",
            label: "Manage Books",
            icon: <MdMenuBook className='w-5 h-5' />,
        },
        {
            id: "staff",
            label: "Manage Staff",
            icon: <MdSupervisorAccount className='w-5 h-5' />,
            requiredRole: "librarian" // Only librarians can see this
        },
        {
            id: "lendings",
            label: "Manage Lendings",
            icon: <MdLibraryBooks className='w-5 h-5' />,
        },
        {
            id: "overdue",
            label: "Manage Overdue",
            icon: <MdSchedule className='w-5 h-5' />,
        },
        {
            id: "audit",
            label: "Manage Audit",
            icon: <MdNotifications className='w-5 h-5' />,
        },
        {
            id: "system-setting",
            label: "System Setting",
            icon: <MdSettings className='w-5 h-5' />,
        }
    ]

    // Filter sidebar items based on user role
    const sidebarItems = allSidebarItems.filter(item => {
        if (!item.requiredRole) return true; // Show items without role requirement
        return user?.role === item.requiredRole; // Show only if user has required role
    });

    return (
        <div className='bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-64 min-h-screen relative overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10'></div>
            <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-600/20 to-transparent'></div>

            {/* Content */}
            <div className='relative z-10 p-6'>
                {/* Header */}
                <div className='mb-8 text-center'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg'>
                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                        </svg>
                    </div>
                    <h1 className='text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                        TURN THE PAGE
                    </h1>
                    <p className='text-xs text-gray-400 font-medium mt-1'>Library Management</p>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className='space-y-2'>
                        {sidebarItems.map((item, index) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item.id)}
                                    className={`group w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-left relative overflow-hidden ${
                                        activeItem === item.id
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-[1.02]"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white hover:transform hover:scale-[1.01]"
                                    }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    {/* Active indicator */}
                                    {activeItem === item.id && (
                                        <div className='absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full'></div>
                                    )}

                                    {/* Icon container */}
                                    <div className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-300 ${
                                        activeItem === item.id
                                            ? "bg-white/20"
                                            : "group-hover:bg-white/10"
                                    }`}>
                                        {item.icon}
                                    </div>

                                    {/* Label */}
                                    <span className='font-medium text-sm'>{item.label}</span>

                                    {/* Hover effect background */}
                                    <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 rounded-xl transition-all duration-300'></div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom decoration */}
                <div className='mt-12 pt-6 border-t border-white/10'>
                    <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <div className='w-2 h-2 bg-indigo-500 rounded-full animate-pulse'></div>
                        <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' style={{animationDelay: '0.5s'}}></div>
                        <div className='w-2 h-2 bg-pink-500 rounded-full animate-pulse' style={{animationDelay: '1s'}}></div>
                    </div>
                    <p className='text-center text-xs text-gray-500 mt-2'>Digital Library v2.0</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar