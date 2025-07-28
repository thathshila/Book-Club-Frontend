// import React from "react";
// import { MdMenuBook, MdPerson, MdLibraryBooks, MdNotificationsActive, MdHistory, MdAssignmentReturn } from "react-icons/md"
// import { useNavigate} from "react-router-dom";
// const MainDashboard: React.FC = () => {
//     const navigate = useNavigate();
//     const dashboardData = {
//         totalBooks: 1240,
//         totalReaders: 350,
//         booksLentOut: 180,
//         overdueBooks: 15,
//         pendingReturnsToday: 6,
//     }
//
//     return (
//         <div className='p-6 bg-gray-100 min-h-screen'>
//             <div className='max-w-7xl mx-auto'>
//                 {/* Header */}
//                 <div className='mb-8'>
//                     <h1 className='text-3xl font-bold text-gray-800'>📚 Book Club Library Dashboard</h1>
//                     <p className='text-gray-600 mt-1'>Welcome back! Here is your library overview.</p>
//                 </div>
//
//                 {/* Statistics Cards */}
//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
//                     <div className='bg-white p-6 rounded-lg shadow hover:shadow-md transition'>
//                         <MdMenuBook className='w-10 h-10 text-indigo-600 mb-2' />
//                         <h2 className='text-lg font-semibold text-gray-700'>Total Books</h2>
//                         <p className='text-2xl font-bold text-gray-900'>{dashboardData.totalBooks}</p>
//                     </div>
//                     <div className='bg-white p-6 rounded-lg shadow hover:shadow-md transition'>
//                         <MdPerson className='w-10 h-10 text-green-600 mb-2' />
//                         <h2 className='text-lg font-semibold text-gray-700'>Total Readers</h2>
//                         <p className='text-2xl font-bold text-gray-900'>{dashboardData.totalReaders}</p>
//                     </div>
//                     <div className='bg-white p-6 rounded-lg shadow hover:shadow-md transition'>
//                         <MdLibraryBooks className='w-10 h-10 text-yellow-600 mb-2' />
//                         <h2 className='text-lg font-semibold text-gray-700'>Books Lent Out</h2>
//                         <p className='text-2xl font-bold text-gray-900'>{dashboardData.booksLentOut}</p>
//                     </div>
//                     <div className='bg-white p-6 rounded-lg shadow hover:shadow-md transition'>
//                         <MdNotificationsActive className='w-10 h-10 text-red-600 mb-2' />
//                         <h2 className='text-lg font-semibold text-gray-700'>Overdue Books</h2>
//                         <p className='text-2xl font-bold text-gray-900'>{dashboardData.overdueBooks}</p>
//                     </div>
//                     <div className='bg-white p-6 rounded-lg shadow hover:shadow-md transition'>
//                         <MdAssignmentReturn className='w-10 h-10 text-purple-600 mb-2' />
//                         <h2 className='text-lg font-semibold text-gray-700'>Pending Returns Today</h2>
//                         <p className='text-2xl font-bold text-gray-900'>{dashboardData.pendingReturnsToday}</p>
//                     </div>
//                 </div>
//
//                 {/* Quick Actions */}
//                 <div className='bg-white rounded-lg shadow p-6'>
//                     <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Actions</h3>
//                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
//                         <button onClick={() => navigate("/manage-books")}
//                                 className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
//                             <MdMenuBook className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
//                             <p className="text-sm font-medium text-gray-900">Manage Books</p>
//                         </button>
//                         <button onClick={() => navigate("/dashboard/readers")}
//                             className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
//                             <MdPerson className='w-8 h-8 text-green-600 mx-auto mb-2' />
//                             <p className='text-sm font-medium text-gray-900'>Add Reader</p>
//                         </button>
//                         <button onClick={() => navigate("/dashboard/lendings")}
//                             className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
//                             <MdLibraryBooks className='w-8 h-8 text-yellow-600 mx-auto mb-2' />
//                             <p className='text-sm font-medium text-gray-900'>Lend Book</p>
//                         </button>
//                         <button onClick={() => navigate("/dashboard/lendingList")}
//                             className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
//                             <MdAssignmentReturn className='w-8 h-8 text-purple-600 mx-auto mb-2' />
//                             <p className='text-sm font-medium text-gray-900'>Mark Return</p>
//                         </button>
//                         <button onClick={() => navigate("/dashboard/lendings")}
//                             className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
//                             <MdNotificationsActive className='w-8 h-8 text-red-600 mx-auto mb-2' />
//                             <p className='text-sm font-medium text-gray-900'>Send Overdue Reminder</p>
//                         </button>
//                         <button onClick={() => navigate("/dashboard/lendingList")}
//                             className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
//                             <MdHistory className='w-8 h-8 text-blue-600 mx-auto mb-2' />
//                             <p className='text-sm font-medium text-gray-900'>View Lending History</p>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default MainDashboard;
//
//
import React from "react";
import { MdMenuBook, MdPerson, MdLibraryBooks, MdNotificationsActive, MdHistory, MdAssignmentReturn } from "react-icons/md"
import { useNavigate} from "react-router-dom";

const MainDashboard: React.FC = () => {
    const navigate = useNavigate();
    const dashboardData = {
        totalBooks: 1240,
        totalReaders: 350,
        booksLentOut: 180,
        overdueBooks: 15,
        pendingReturnsToday: 6,
    }

    return (
        <div className='p-4 sm:p-6 bg-gray-100 min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-6 sm:mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>📚 Book Club Library Dashboard</h1>
                    <p className='text-sm sm:text-base text-gray-600 mt-1'>Welcome back! Here is your library overview.</p>
                </div>

                {/* Statistics Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8'>
                    <div className='bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition'>
                        <MdMenuBook className='w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 mb-2' />
                        <h2 className='text-sm sm:text-lg font-semibold text-gray-700'>Total Books</h2>
                        <p className='text-xl sm:text-2xl font-bold text-gray-900'>{dashboardData.totalBooks}</p>
                    </div>
                    <div className='bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition'>
                        <MdPerson className='w-8 h-8 sm:w-10 sm:h-10 text-green-600 mb-2' />
                        <h2 className='text-sm sm:text-lg font-semibold text-gray-700'>Total Readers</h2>
                        <p className='text-xl sm:text-2xl font-bold text-gray-900'>{dashboardData.totalReaders}</p>
                    </div>
                    <div className='bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition'>
                        <MdLibraryBooks className='w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 mb-2' />
                        <h2 className='text-sm sm:text-lg font-semibold text-gray-700'>Books Lent Out</h2>
                        <p className='text-xl sm:text-2xl font-bold text-gray-900'>{dashboardData.booksLentOut}</p>
                    </div>
                    <div className='bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition'>
                        <MdNotificationsActive className='w-8 h-8 sm:w-10 sm:h-10 text-red-600 mb-2' />
                        <h2 className='text-sm sm:text-lg font-semibold text-gray-700'>Overdue Books</h2>
                        <p className='text-xl sm:text-2xl font-bold text-gray-900'>{dashboardData.overdueBooks}</p>
                    </div>
                    <div className='bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition'>
                        <MdAssignmentReturn className='w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-2' />
                        <h2 className='text-sm sm:text-lg font-semibold text-gray-700'>Pending Returns Today</h2>
                        <p className='text-xl sm:text-2xl font-bold text-gray-900'>{dashboardData.pendingReturnsToday}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='bg-white rounded-lg shadow p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Quick Actions</h3>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4'>
                        <button
                            onClick={() => navigate("/manage-books")}
                            className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center"
                        >
                            <MdMenuBook className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mb-1 sm:mb-2" />
                            <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">Manage Books</p>
                        </button>
                        <button
                            onClick={() => navigate("/dashboard/readers")}
                            className='p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center'
                        >
                            <MdPerson className='w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-1 sm:mb-2' />
                            <p className='text-xs sm:text-sm font-medium text-gray-900 text-center'>Add Reader</p>
                        </button>
                        <button
                            onClick={() => navigate("/dashboard/lendings")}
                            className='p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center'
                        >
                            <MdLibraryBooks className='w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-1 sm:mb-2' />
                            <p className='text-xs sm:text-sm font-medium text-gray-900 text-center'>Lend Book</p>
                        </button>
                        <button
                            onClick={() => navigate("/dashboard/lendingList")}
                            className='p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center'
                        >
                            <MdAssignmentReturn className='w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-1 sm:mb-2' />
                            <p className='text-xs sm:text-sm font-medium text-gray-900 text-center'>Mark Return</p>
                        </button>
                        <button
                            onClick={() => navigate("/dashboard/lendings")}
                            className='p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center'
                        >
                            <MdNotificationsActive className='w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-1 sm:mb-2' />
                            <p className='text-xs sm:text-sm font-medium text-gray-900 text-center'>Overdue Reminder</p>
                        </button>
                        <button
                            onClick={() => navigate("/dashboard/lendingList")}
                            className='p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center'
                        >
                            <MdHistory className='w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-1 sm:mb-2' />
                            <p className='text-xs sm:text-sm font-medium text-gray-900 text-center'>Lending History</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard;