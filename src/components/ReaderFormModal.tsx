// import React, { useState, useEffect } from "react";
// import apiClient from "../services/apiClient";
// import toast from "react-hot-toast";
// import type {Reader} from "../pages/ManageReaderPage";
//
// interface Props {
//     onClose: () => void;
//     existingReader?: Reader | null;
//     isEdit: boolean;
// }
//
// const ReaderFormModal: React.FC<Props> = ({ onClose, existingReader, isEdit }) => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [nic, setNic] = useState("");
//
//     useEffect(() => {
//         if (existingReader) {
//             setName(existingReader.name || "");
//             setEmail(existingReader.email || "");
//             setPhone(existingReader.phone || "");
//             setAddress(existingReader.address || "");
//             setDateOfBirth(existingReader.dateOfBirth ? existingReader.dateOfBirth.slice(0, 10) : "");
//             setNic(existingReader.nic || "");
//         }
//     }, [existingReader]);
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const readerData = { name, email, phone, address, dateOfBirth, nic };
//
//             if (isEdit && existingReader) {
//                 await apiClient.put(`/reader/${existingReader._id}`, readerData);
//                 toast.success("Reader updated successfully");
//             } else {
//                 await apiClient.post("/reader", readerData);
//                 toast.success("Reader added successfully");
//             }
//
//             onClose();
//         } catch {
//             toast.error("Failed to save reader");
//         }
//     };
//
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded shadow-md w-96 space-y-4"
//             >
//                 <h2 className="text-xl font-bold">
//                     {isEdit ? "Edit Reader" : "Add Reader"}
//                 </h2>
//                 <input
//                     className="border w-full p-2"
//                     placeholder="Name"
//                     value={name}
//                     onChange={e => setName(e.target.value)}
//                     required
//                 />
//                 <input
//                     className="border w-full p-2"
//                     placeholder="Email"
//                     type="email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     required
//                     disabled={isEdit}
//                 />
//                 <input
//                     className="border w-full p-2"
//                     placeholder="Phone"
//                     value={phone}
//                     onChange={e => setPhone(e.target.value)}
//                 />
//                 <input
//                     className="border w-full p-2"
//                     placeholder="Address"
//                     value={address}
//                     onChange={e => setAddress(e.target.value)}
//                 />
//                 <input
//                     className="border w-full p-2"
//                     type="date"
//                     value={dateOfBirth}
//                     onChange={e => setDateOfBirth(e.target.value)}
//                 />
//                 <input
//                     className="border w-full p-2"
//                     placeholder="NIC"
//                     value={nic}
//                     onChange={e => setNic(e.target.value)}
//                     required
//                     disabled={isEdit}
//                 />
//                 <div className="flex justify-end space-x-2">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-300 rounded"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-green-600 text-white rounded"
//                     >
//                         {isEdit ? "Update" : "Add"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export default ReaderFormModal;


// import React, { useState, useEffect } from "react";
// import apiClient from "../services/apiClient";
// import toast from "react-hot-toast";
// import type {Reader} from "../pages/ManageReaderPage";
//
// interface Props {
//     onClose: () => void;
//     existingReader?: Reader | null;
//     isEdit: boolean;
// }
//
// const ReaderFormModal: React.FC<Props> = ({ onClose, existingReader, isEdit }) => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [nic, setNic] = useState("");
//
//     useEffect(() => {
//         if (existingReader) {
//             setName(existingReader.name || "");
//             setEmail(existingReader.email || "");
//             setPhone(existingReader.phone || "");
//             setAddress(existingReader.address || "");
//             setDateOfBirth(existingReader.dateOfBirth ? existingReader.dateOfBirth.slice(0, 10) : "");
//             setNic(existingReader.nic || "");
//         }
//     }, [existingReader]);
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const readerData = { name, email, phone, address, dateOfBirth, nic };
//
//             if (isEdit && existingReader) {
//                 await apiClient.put(`/reader/${existingReader._id}`, readerData);
//                 toast.success("Reader updated successfully");
//             } else {
//                 await apiClient.post("/reader", readerData);
//                 toast.success("Reader added successfully");
//             }
//
//             onClose();
//         } catch {
//             toast.error("Failed to save reader");
//         }
//     };
//
//     return (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                             <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                                 {isEdit ? "✏️" : "👤"}
//                             </div>
//                             {isEdit ? "Edit Reader" : "Add New Reader"}
//                         </h2>
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
//                         >
//                             ✕
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="p-6 space-y-5">
//                     {/* Name Field */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                             👤 Full Name
//                         </label>
//                         <input
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
//                             placeholder="Enter full name"
//                             value={name}
//                             onChange={e => setName(e.target.value)}
//                             required
//                         />
//                     </div>
//
//                     {/* Email Field */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                             📧 Email Address
//                             {isEdit && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">Read-only</span>}
//                         </label>
//                         <input
//                             className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none ${
//                                 isEdit
//                                     ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
//                                     : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                             }`}
//                             placeholder="Enter email address"
//                             type="email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             required
//                             disabled={isEdit}
//                         />
//                     </div>
//
//                     {/* Phone Field */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                             📱 Phone Number
//                         </label>
//                         <input
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
//                             placeholder="Enter phone number"
//                             value={phone}
//                             onChange={e => setPhone(e.target.value)}
//                         />
//                     </div>
//
//                     {/* Address Field */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                             🏠 Address
//                         </label>
//                         <input
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
//                             placeholder="Enter address"
//                             value={address}
//                             onChange={e => setAddress(e.target.value)}
//                         />
//                     </div>
//
//                     {/* Date of Birth Field */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                             🎂 Date of Birth
//                         </label>
//                         <input
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
//                             type="date"
//                             value={dateOfBirth}
//                             onChange={e => setDateOfBirth(e.target.value)}
//                         />
//                     </div>
//
//                     {/* NIC Field */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                             🆔 NIC Number
//                             {isEdit && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">Read-only</span>}
//                         </label>
//                         <input
//                             className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none ${
//                                 isEdit
//                                     ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
//                                     : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                             }`}
//                             placeholder="Enter NIC number"
//                             value={nic}
//                             onChange={e => setNic(e.target.value)}
//                             required
//                             disabled={isEdit}
//                         />
//                     </div>
//
//                     {/* Action Buttons */}
//                     <div className="flex gap-3 pt-4">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
//                         >
//                             {isEdit ? "Update Reader" : "Add Reader"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default ReaderFormModal;


import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import type {Reader} from "../pages/ManageReaderPage";

interface Props {
    onClose: () => void;
    existingReader?: Reader | null;
    isEdit: boolean;
}

const ReaderFormModal: React.FC<Props> = ({ onClose, existingReader, isEdit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nic, setNic] = useState("");

    useEffect(() => {
        if (existingReader) {
            setName(existingReader.name || "");
            setEmail(existingReader.email || "");
            setPhone(existingReader.phone || "");
            setAddress(existingReader.address || "");
            setDateOfBirth(existingReader.dateOfBirth ? existingReader.dateOfBirth.slice(0, 10) : "");
            setNic(existingReader.nic || "");
        }
    }, [existingReader]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const readerData = { name, email, phone, address, dateOfBirth, nic };

            if (isEdit && existingReader) {
                await apiClient.put(`/reader/${existingReader._id}`, readerData);
                toast.success("Reader updated successfully");
            } else {
                await apiClient.post("/reader", readerData);
                toast.success("Reader added successfully");
            }

            onClose();
        } catch {
            toast.error("Failed to save reader");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-hidden">
                {/* Clean Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"} />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {isEdit ? "Edit Reader" : "Add Reader"}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {isEdit ? "Update reader information" : "Create a new library member"}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Clean Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(95vh-120px)] overflow-y-auto">
                    {/* Name Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                            {isEdit && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Read-only</span>}
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg transition-all outline-none ${
                                isEdit
                                    ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                            }`}
                            placeholder="Enter email address"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={isEdit}
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    {/* Address Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none resize-none"
                            placeholder="Enter address"
                            rows={2}
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Date of Birth Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none"
                            type="date"
                            value={dateOfBirth}
                            onChange={e => setDateOfBirth(e.target.value)}
                        />
                    </div>

                    {/* NIC Field */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            NIC Number <span className="text-red-500">*</span>
                            {isEdit && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Read-only</span>}
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-lg transition-all outline-none ${
                                isEdit
                                    ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                            }`}
                            placeholder="Enter NIC number"
                            value={nic}
                            onChange={e => setNic(e.target.value)}
                            required
                            disabled={isEdit}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                        >
                            {isEdit ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReaderFormModal;