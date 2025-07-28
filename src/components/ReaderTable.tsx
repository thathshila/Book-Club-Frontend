// import React from "react";
// import type {Reader} from "../pages/ManageReaderPage.tsx";
//
// interface Props {
//     readers: Reader[];
//     onEdit: (reader: Reader) => void;
//     onDelete: (id: string) => void;
// }
//
// const ReaderTable: React.FC<Props> = ({ readers, onEdit, onDelete }) => {
//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                 <tr className="bg-gray-100">
//                     <th className="py-2 px-4 border">Member ID</th>
//                     <th className="py-2 px-4 border">Name</th>
//                     <th className="py-2 px-4 border">Email</th>
//                     <th className="py-2 px-4 border">Phone</th>
//                     <th className="py-2 px-4 border">Address</th>
//                     <th className="py-2 px-4 border">DOB</th>
//                     <th className="py-2 px-4 border">NIC</th>
//                     <th className="py-2 px-4 border">Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {readers.map(reader => (
//                     <tr key={reader._id} className="text-center">
//                         <td className="py-2 px-4 border">{reader.memberId}</td>
//                         <td className="py-2 px-4 border">{reader.name}</td>
//                         <td className="py-2 px-4 border">{reader.email}</td>
//                         <td className="py-2 px-4 border">{reader.phone || "-"}</td>
//                         <td className="py-2 px-4 border">{reader.address || "-"}</td>
//                         <td className="py-2 px-4 border">{reader.dateOfBirth?.slice(0, 10) || "-"}</td>
//                         <td className="py-2 px-4 border">{reader.nic}</td>
//                         <td className="py-2 px-4 border space-x-2">
//                             <button
//                                 onClick={() => onEdit(reader)}
//                                 className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => onDelete(reader._id)}
//                                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                             >
//                                 Delete
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default ReaderTable;


// import React from "react";
// import type {Reader} from "../pages/ManageReaderPage.tsx";
//
// interface Props {
//     readers: Reader[];
//     onEdit: (reader: Reader) => void;
//     onDelete: (id: string) => void;
// }
//
// const ReaderTable: React.FC<Props> = ({ readers, onEdit, onDelete }) => {
//     return (
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                     <thead>
//                     <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 🆔 Member ID
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 👤 Name
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 📧 Email
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 📱 Phone
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 🏠 Address
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 🎂 DOB
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-left font-semibold tracking-wide">
//                             <div className="flex items-center gap-2">
//                                 🆔 NIC
//                             </div>
//                         </th>
//                         <th className="py-4 px-6 text-center font-semibold tracking-wide">
//                             <div className="flex items-center justify-center gap-2">
//                                 ⚙️ Actions
//                             </div>
//                         </th>
//                     </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                     {readers.map((reader, index) => (
//                         <tr
//                             key={reader._id}
//                             className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${
//                                 index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'
//                             }`}
//                         >
//                             <td className="py-4 px-6">
//                                 <div className="flex items-center">
//                                     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
//                                         {reader.memberId?.slice(-2) || '##'}
//                                     </div>
//                                     <span className="font-medium text-gray-900">
//                                             {reader.memberId}
//                                         </span>
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="font-medium text-gray-900">
//                                     {reader.name}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="text-gray-700 break-all">
//                                     {reader.email}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="text-gray-700">
//                                     {reader.phone ? (
//                                         <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
//                                                 {reader.phone}
//                                             </span>
//                                     ) : (
//                                         <span className="text-gray-400 italic">No phone</span>
//                                     )}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="text-gray-700 max-w-32 truncate" title={reader.address || "No address"}>
//                                     {reader.address ? (
//                                         <span>{reader.address}</span>
//                                     ) : (
//                                         <span className="text-gray-400 italic">No address</span>
//                                     )}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="text-gray-700">
//                                     {reader.dateOfBirth?.slice(0, 10) ? (
//                                         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
//                                                 {reader.dateOfBirth.slice(0, 10)}
//                                             </span>
//                                     ) : (
//                                         <span className="text-gray-400 italic">Not set</span>
//                                     )}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
//                                     {reader.nic}
//                                 </div>
//                             </td>
//                             <td className="py-4 px-6">
//                                 <div className="flex items-center justify-center gap-2">
//                                     <button
//                                         onClick={() => onEdit(reader)}
//                                         className="group flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
//                                     >
//                                         <span className="group-hover:rotate-12 transition-transform duration-200">✏️</span>
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(reader._id)}
//                                         className="group flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
//                                     >
//                                         <span className="group-hover:scale-110 transition-transform duration-200">🗑️</span>
//                                         Delete
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//
//                 {/* Empty State */}
//                 {readers.length === 0 && (
//                     <div className="text-center py-12">
//                         <div className="text-6xl mb-4">📚</div>
//                         <h3 className="text-lg font-semibold text-gray-600 mb-2">No readers found</h3>
//                         <p className="text-gray-500">Add your first reader to get started!</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ReaderTable;


// ReaderTable.tsx - Professional Design
// import React from "react";
// import type {Reader} from "../pages/ManageReaderPage.tsx";
//
// interface TableProps {
//     readers: Reader[];
//     onEdit: (reader: Reader) => void;
//     onDelete: (id: string) => void;
// }
//
// const ReaderTable: React.FC<TableProps> = ({ readers, onEdit, onDelete }) => {
//     return (
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                     <thead>
//                     <tr className="bg-gray-50 border-b border-gray-200">
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             Member ID
//                         </th>
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             Name
//                         </th>
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             Email
//                         </th>
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             Phone
//                         </th>
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             Address
//                         </th>
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             Date of Birth
//                         </th>
//                         <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//                             NIC
//                         </th>
//                         <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
//                             Actions
//                         </th>
//                     </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                     {readers.map((reader, index) => (
//                         <tr
//                             key={reader._id}
//                             className="hover:bg-gray-50 transition-colors"
//                         >
//                             <td className="py-3 px-4">
//                                 <div className="flex items-center space-x-3">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-medium">
//                                         {reader.memberId?.slice(-2) || '##'}
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-900">
//                                         {reader.memberId}
//                                     </span>
//                                 </div>
//                             </td>
//                             <td className="py-3 px-4">
//                                 <span className="text-sm font-medium text-gray-900">
//                                     {reader.name}
//                                 </span>
//                             </td>
//                             <td className="py-3 px-4">
//                                 <span className="text-sm text-gray-600">
//                                     {reader.email}
//                                 </span>
//                             </td>
//                             <td className="py-3 px-4">
//                                 {reader.phone ? (
//                                     <span className="text-sm text-gray-900">
//                                         {reader.phone}
//                                     </span>
//                                 ) : (
//                                     <span className="text-sm text-gray-400">Not provided</span>
//                                 )}
//                             </td>
//                             <td className="py-3 px-4">
//                                 <div className="text-sm text-gray-600 max-w-32 truncate" title={reader.address || "No address"}>
//                                     {reader.address || <span className="text-gray-400">Not provided</span>}
//                                 </div>
//                             </td>
//                             <td className="py-3 px-4">
//                                 {reader.dateOfBirth?.slice(0, 10) ? (
//                                     <span className="text-sm text-gray-900">
//                                         {reader.dateOfBirth.slice(0, 10)}
//                                     </span>
//                                 ) : (
//                                     <span className="text-sm text-gray-400">Not set</span>
//                                 )}
//                             </td>
//                             <td className="py-3 px-4">
//                                 <span className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
//                                     {reader.nic}
//                                 </span>
//                             </td>
//                             <td className="py-3 px-4">
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <button
//                                         onClick={() => onEdit(reader)}
//                                         className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                                         title="Edit reader"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                         </svg>
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(reader._id)}
//                                         className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
//                                         title="Delete reader"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//
//                 {/* Clean Empty State */}
//                 {readers.length === 0 && (
//                     <div className="text-center py-12">
//                         <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No readers found</h3>
//                         <p className="text-gray-500">Start by adding your first library member.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ReaderTable;


// ReaderTable.tsx
import React from "react";
import Swal from "sweetalert2";
import type { Reader } from "../pages/ManageReaderPage.tsx";

interface TableProps {
    readers: Reader[];
    onEdit: (reader: Reader) => void;
    onDelete: (id: string) => void;
}

const ReaderTable: React.FC<TableProps> = ({ readers, onEdit, onDelete }) => {
    const handleDeleteClick = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            onDelete(id);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {readers.map((reader) => (
                        <tr key={reader._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-800 font-medium">{reader.memberId?.slice(-2) || '##'}</span>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{reader.memberId || 'N/A'}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{reader.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{reader.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{reader.phone || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onEdit(reader)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(reader._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {readers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No readers found</h3>
                        <p className="text-gray-500">Start by adding your first library member.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReaderTable;