//
// import React, { useEffect, useState } from "react";
// import ReaderFormModal from "../components/ReaderFormModal";
// import apiClient from "../services/apiClient";
// import toast from "react-hot-toast";
// import ReaderTable from "../components/ReaderTable.tsx";
//
// export interface Reader {
//     _id: string;
//     name: string;
//     email: string;
//     phone?: string;
//     address?: string;
//     dateOfBirth?: string;
//     memberId?: string;
//     nic?: string;
//     createdAt?: string;
//     isActive?: boolean;
// }
//
// const ManageReaders: React.FC = () => {
//     const [readers, setReaders] = useState<Reader[]>([]);
//     const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEdit, setIsEdit] = useState(false);
//
//     const [searchParams, setSearchParams] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         nic: "",
//     });
//
//     const fetchReaders = async () => {
//         try {
//             const res = await apiClient.get("/reader");
//             setReaders(res.data);
//         } catch {
//             toast.error("Failed to fetch readers");
//         }
//     };
//
//     useEffect(() => {
//         fetchReaders();
//     }, []);
//
//     const handleSearch = async () => {
//         try {
//             const query = new URLSearchParams(searchParams).toString();
//             const res = await apiClient.get(`/reader/filter?${query}`);
//             setReaders(res.data);
//         } catch {
//             toast.error("Failed to search readers");
//         }
//     };
//
//     const handleAdd = () => {
//         setSelectedReader(null);
//         setIsEdit(false);
//         setIsModalOpen(true);
//     };
//
//     const handleEdit = (reader: Reader) => {
//         setSelectedReader(reader);
//         setIsEdit(true);
//         setIsModalOpen(true);
//     };
//
//     const handleDelete = async (id: string) => {
//         if (!window.confirm("Are you sure you want to delete this reader?")) return;
//         try {
//             await apiClient.delete(`/reader/${id}`);
//             toast.success("Reader deleted successfully");
//             fetchReaders();
//         } catch {
//             toast.error("Failed to delete reader");
//         }
//     };
//
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         fetchReaders();
//     };
//
//     return (
//         <div className="p-6 space-y-4">
//             <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-bold">Manage Readers</h1>
//                 <button
//                     onClick={handleAdd}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                     Add Reader
//                 </button>
//             </div>
//
//             {/* Search Filters */}
//             <div className="bg-white p-4 rounded shadow space-y-2">
//                 <h3 className="text-lg font-semibold">Search Readers</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
//                     {["name", "email", "phone", "nic"].map((field) => (
//                         <input
//                             key={field}
//                             type="text"
//                             placeholder={`Search by ${field}`}
//                             value={searchParams[field as keyof typeof searchParams]}
//                             onChange={(e) =>
//                                 setSearchParams((prev) => ({
//                                     ...prev,
//                                     [field]: e.target.value
//                                 }))
//                             }
//                             className="border border-gray-300 rounded p-2"
//                         />
//                     ))}
//                 </div>
//                 <button
//                     onClick={handleSearch}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//                 >
//                     Search
//                 </button>
//             </div>
//
//             <ReaderTable readers={readers} onEdit={handleEdit} onDelete={handleDelete} />
//
//             {isModalOpen && (
//                 <ReaderFormModal
//                     onClose={handleModalClose}
//                     existingReader={selectedReader}
//                     isEdit={isEdit}
//                 />
//             )}
//         </div>
//     );
// };
//
// export default ManageReaders;


// import React, { useEffect, useState } from "react";
// import ReaderFormModal from "../components/ReaderFormModal";
// import apiClient from "../services/apiClient";
// import toast from "react-hot-toast";
// import ReaderTable from "../components/ReaderTable.tsx";
//
// export interface Reader {
//     _id: string;
//     name: string;
//     email: string;
//     phone?: string;
//     address?: string;
//     dateOfBirth?: string;
//     memberId?: string;
//     nic?: string;
//     createdAt?: string;
//     isActive?: boolean;
// }
//
// const ManageReaders: React.FC = () => {
//     const [readers, setReaders] = useState<Reader[]>([]);
//     const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEdit, setIsEdit] = useState(false);
//
//     const [searchParams, setSearchParams] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         nic: "",
//     });
//
//     const fetchReaders = async () => {
//         try {
//             const res = await apiClient.get("/reader");
//             setReaders(res.data);
//         } catch {
//             toast.error("Failed to fetch readers");
//         }
//     };
//
//     useEffect(() => {
//         fetchReaders();
//     }, []);
//
//     const handleSearch = async () => {
//         try {
//             const query = new URLSearchParams(searchParams).toString();
//             const res = await apiClient.get(`/reader/filter?${query}`);
//             setReaders(res.data);
//         } catch {
//             toast.error("Failed to search readers");
//         }
//     };
//
//     const handleAdd = () => {
//         setSelectedReader(null);
//         setIsEdit(false);
//         setIsModalOpen(true);
//     };
//
//     const handleEdit = (reader: Reader) => {
//         setSelectedReader(reader);
//         setIsEdit(true);
//         setIsModalOpen(true);
//     };
//
//     const handleDelete = async (id: string) => {
//         if (!window.confirm("Are you sure you want to delete this reader?")) return;
//         try {
//             await apiClient.delete(`/reader/${id}`);
//             toast.success("Reader deleted successfully");
//             fetchReaders();
//         } catch {
//             toast.error("Failed to delete reader");
//         }
//     };
//
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         fetchReaders();
//     };
//
//     const fieldLabels = {
//         name: { label: "Name", icon: "👤" },
//         email: { label: "Email", icon: "📧" },
//         phone: { label: "Phone", icon: "📱" },
//         nic: { label: "NIC", icon: "🆔" }
//     };
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
//             <div className="max-w-7xl mx-auto space-y-8">
//                 {/* Header Section */}
//                 <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                         <div className="flex items-center gap-4">
//                             <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                                 <span className="text-2xl">📚</span>
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Readers</h1>
//                                 <p className="text-gray-600">Add, edit, and manage library members</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={handleAdd}
//                             className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
//                         >
//                             <span className="group-hover:rotate-180 transition-transform duration-300">➕</span>
//                             Add New Reader
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Search Filters Section */}
//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//                     <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//                                 <span className="text-xl">🔍</span>
//                             </div>
//                             <h3 className="text-xl font-bold text-white">Search & Filter Readers</h3>
//                         </div>
//                     </div>
//
//                     <div className="p-6 space-y-6">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                             {["name", "email", "phone", "nic"].map((field) => {
//                                 const fieldInfo = fieldLabels[field as keyof typeof fieldLabels];
//                                 return (
//                                     <div key={field} className="space-y-2">
//                                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                                             {fieldInfo.icon} {fieldInfo.label}
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder={`Search by ${fieldInfo.label.toLowerCase()}`}
//                                             value={searchParams[field as keyof typeof searchParams]}
//                                             onChange={(e) =>
//                                                 setSearchParams((prev) => ({
//                                                     ...prev,
//                                                     [field]: e.target.value
//                                                 }))
//                                             }
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none hover:border-gray-300"
//                                         />
//                                     </div>
//                                 );
//                             })}
//                         </div>
//
//                         <div className="flex flex-col sm:flex-row gap-3">
//                             <button
//                                 onClick={handleSearch}
//                                 className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
//                             >
//                                 <span>🔍</span>
//                                 Search Readers
//                             </button>
//
//                             <button
//                                 onClick={() => {
//                                     setSearchParams({ name: "", email: "", phone: "", nic: "" });
//                                     fetchReaders();
//                                 }}
//                                 className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
//                             >
//                                 <span>🔄</span>
//                                 Clear Filters
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Stats Section */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">Total Readers</p>
//                                 <p className="text-2xl font-bold text-gray-900">{readers.length}</p>
//                             </div>
//                             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-xl">👥</span>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">Active Members</p>
//                                 <p className="text-2xl font-bold text-green-600">
//                                     {readers.filter(r => r.isActive !== false).length}
//                                 </p>
//                             </div>
//                             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-xl">✅</span>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">With Phone</p>
//                                 <p className="text-2xl font-bold text-purple-600">
//                                     {readers.filter(r => r.phone).length}
//                                 </p>
//                             </div>
//                             <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-xl">📱</span>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">Complete Profiles</p>
//                                 <p className="text-2xl font-bold text-orange-600">
//                                     {readers.filter(r => r.phone && r.address && r.dateOfBirth).length}
//                                 </p>
//                             </div>
//                             <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-xl">📋</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Table Section */}
//                 <div>
//                     <ReaderTable readers={readers} onEdit={handleEdit} onDelete={handleDelete} />
//                 </div>
//
//                 {/* Modal */}
//                 {isModalOpen && (
//                     <ReaderFormModal
//                         onClose={handleModalClose}
//                         existingReader={selectedReader}
//                         isEdit={isEdit}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ManageReaders;

// import React, { useEffect, useState } from "react";
// import ReaderFormModal from "../components/ReaderFormModal";
// import apiClient from "../services/apiClient";
// import toast from "react-hot-toast";
// import ReaderTable from "../components/ReaderTable.tsx";
//
// export interface Reader {
//     _id: string;
//     name: string;
//     email: string;
//     phone?: string;
//     address?: string;
//     dateOfBirth?: string;
//     memberId?: string;
//     nic?: string;
//     createdAt?: string;
//     isActive?: boolean;
// }
//
// const ManageReaders: React.FC = () => {
//     const [readers, setReaders] = useState<Reader[]>([]);
//     const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEdit, setIsEdit] = useState(false);
//
//     const [searchParams, setSearchParams] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         nic: "",
//     });
//
//     const fetchReaders = async () => {
//         try {
//             const res = await apiClient.get("/reader");
//             setReaders(res.data);
//         } catch {
//             toast.error("Failed to fetch readers");
//         }
//     };
//
//     useEffect(() => {
//         fetchReaders();
//     }, []);
//
//     const handleSearch = async () => {
//         try {
//             const query = new URLSearchParams(searchParams).toString();
//             const res = await apiClient.get(`/reader/filter?${query}`);
//             setReaders(res.data);
//         } catch {
//             toast.error("Failed to search readers");
//         }
//     };
//
//     const handleAdd = () => {
//         setSelectedReader(null);
//         setIsEdit(false);
//         setIsModalOpen(true);
//     };
//
//     const handleEdit = (reader: Reader) => {
//         setSelectedReader(reader);
//         setIsEdit(true);
//         setIsModalOpen(true);
//     };
//
//     const handleDelete = async (id: string) => {
//         if (!window.confirm("Are you sure you want to delete this reader?")) return;
//         try {
//             await apiClient.delete(`/reader/${id}`);
//             toast.success("Reader deleted successfully");
//             fetchReaders();
//         } catch {
//             toast.error("Failed to delete reader");
//         }
//     };
//
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         fetchReaders();
//     };
//
//     const clearFilters = () => {
//         setSearchParams({ name: "", email: "", phone: "", nic: "" });
//         fetchReaders();
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto p-6 space-y-6">
//                 {/* Clean Header */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                         <div className="flex items-center space-x-4">
//                             <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-semibold text-gray-900">Manage Readers</h1>
//                                 <p className="text-gray-600">Library member management</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={handleAdd}
//                             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                             </svg>
//                             <span>Add New Reader</span>
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Statistics Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">Total Readers</p>
//                                 <p className="text-2xl font-semibold text-gray-900 mt-1">{readers.length}</p>
//                             </div>
//                             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">Active Members</p>
//                                 <p className="text-2xl font-semibold text-green-600 mt-1">
//                                     {readers.filter(r => r.isActive !== false).length}
//                                 </p>
//                             </div>
//                             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">With Phone</p>
//                                 <p className="text-2xl font-semibold text-purple-600 mt-1">
//                                     {readers.filter(r => r.phone).length}
//                                 </p>
//                             </div>
//                             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">Complete Profiles</p>
//                                 <p className="text-2xl font-semibold text-orange-600 mt-1">
//                                     {readers.filter(r => r.phone && r.address && r.dateOfBirth).length}
//                                 </p>
//                             </div>
//                             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Search Section */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                     <div className="flex items-center space-x-3 mb-6">
//                         <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                             <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-lg font-medium text-gray-900">Search Readers</h3>
//                     </div>
//
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Search by name..."
//                                 value={searchParams.name}
//                                 onChange={(e) => setSearchParams(prev => ({ ...prev, name: e.target.value }))}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                             <input
//                                 type="text"
//                                 placeholder="Search by email..."
//                                 value={searchParams.email}
//                                 onChange={(e) => setSearchParams(prev => ({ ...prev, email: e.target.value }))}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                             <input
//                                 type="text"
//                                 placeholder="Search by phone..."
//                                 value={searchParams.phone}
//                                 onChange={(e) => setSearchParams(prev => ({ ...prev, phone: e.target.value }))}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">NIC</label>
//                             <input
//                                 type="text"
//                                 placeholder="Search by NIC..."
//                                 value={searchParams.nic}
//                                 onChange={(e) => setSearchParams(prev => ({ ...prev, nic: e.target.value }))}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="flex gap-3">
//                         <button
//                             onClick={handleSearch}
//                             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                             <span>Search</span>
//                         </button>
//
//                         <button
//                             onClick={clearFilters}
//                             className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                             </svg>
//                             <span>Clear</span>
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Reader Table */}
//                 <ReaderTable readers={readers} onEdit={handleEdit} onDelete={handleDelete} />
//
//                 {/* Modal */}
//                 {isModalOpen && (
//                     <ReaderFormModal
//                         onClose={handleModalClose}
//                         existingReader={selectedReader}
//                         isEdit={isEdit}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ManageReaders;


// ManageReaders.tsx
import React, { useEffect, useState } from "react";
import ReaderFormModal from "../components/ReaderFormModal";
import apiClient from "../services/apiClient";
import Swal from "sweetalert2";
import ReaderTable from "../components/ReaderTable.tsx";

export interface Reader {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    memberId?: string;
    nic?: string;
    createdAt?: string;
    isActive?: boolean;
}

const ManageReaders: React.FC = () => {
    const [readers, setReaders] = useState<Reader[]>([]);
    const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useState({
        name: "",
        email: "",
        phone: "",
        nic: "",
    });

    const fetchReaders = async () => {
        setIsLoading(true);
        try {
            const res = await apiClient.get("/reader");
            setReaders(res.data);
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to fetch readers",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReaders();
    }, []);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams(searchParams).toString();
            const res = await apiClient.get(`/reader/filter?${query}`);
            setReaders(res.data);
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to search readers",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedReader(null);
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleEdit = (reader: Reader) => {
        setSelectedReader(reader);
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await apiClient.delete(`/reader/${id}`);
            Swal.fire({
                title: "Deleted!",
                text: "Reader deleted successfully",
                icon: "success",
                confirmButtonColor: "#4f46e5",
            });
            fetchReaders();
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to delete reader",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchReaders();
    };

    const clearFilters = () => {
        setSearchParams({ name: "", email: "", phone: "", nic: "" });
        fetchReaders();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Manage Readers</h1>
                            <p className="text-gray-600">Library member management</p>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Add New Reader</span>
                        </button>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Search Readers</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchParams.name}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="text"
                                placeholder="Search by email..."
                                value={searchParams.email}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                placeholder="Search by phone..."
                                value={searchParams.phone}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                            <input
                                type="text"
                                placeholder="Search by NIC..."
                                value={searchParams.nic}
                                onChange={(e) => setSearchParams(prev => ({ ...prev, nic: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Search</span>
                        </button>

                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Clear</span>
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Reader Table */}
                {!isLoading && <ReaderTable readers={readers} onEdit={handleEdit} onDelete={handleDelete} />}

                {/* Modal */}
                {isModalOpen && (
                    <ReaderFormModal
                        onClose={handleModalClose}
                        existingReader={selectedReader}
                        isEdit={isEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default ManageReaders;