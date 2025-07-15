import React, { useState, type JSX } from "react"
import { MdDashboard, MdPeople, MdInventory, MdShoppingCart } from "react-icons/md"
import { useNavigate } from "react-router-dom"

interface SidebarItem {
    id: string
    label: string
    icon: JSX.Element
}

const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>("dashboard")
    const navigate = useNavigate()

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId)
        if (itemId === "dashboard") navigate(`/dashboard`)
        if (itemId === "lendings") navigate(`/lendings`)
        else navigate(`/dashboard/${itemId}`)
    }

    const sidebarItems: SidebarItem[] = [
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
            icon: <MdInventory className='w-5 h-5' />,
        },
        {
            id: "staff",
            label: "Manage Staff",
            icon: <MdShoppingCart className='w-5 h-5' />,
        },
        {
            id: "lendings",
            label: "Manage Lendings",
            icon: <MdShoppingCart className='w-5 h-5' />,
        },
        {
            id: "overdue",
            label: "Manage Overdue",
            icon: <MdShoppingCart className='w-5 h-5' />,
        },
        {
            id: "notification",
            label: "Manage Notification",
            icon: <MdShoppingCart className='w-5 h-5' />,
        },
        {
            id: "system setting",
            label: "System Setting",
            icon: <MdShoppingCart className='w-5 h-5' />,
        },
    ]

    return (
        <div className='bg-gray-900 text-white w-64 min-h-screen p-4'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-center py-4'>TURN THE PAGE</h1>
            </div>

            <nav>
                <ul className='space-y-2'>
                    {sidebarItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleItemClick(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                                    activeItem === item.id
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                            >
                                <span className='flex-shrink-0'>{item.icon}</span>
                                <span className='font-medium'>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar