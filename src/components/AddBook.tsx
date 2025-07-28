//
// import React, { useState } from "react"
// import { addBook } from "../services/bookService.ts"
// import toast from "react-hot-toast"
// import {
//     MdTitle,
//     MdPerson,
//     MdCalendarToday,
//     MdCategory,
//     MdDescription,
//     MdNumbers,
//     MdCloudUpload,
//     MdImage,
//     MdAdd,
//     MdBookmark
// } from "react-icons/md"
//
// const AddBookForm = ({ onBookAdded }: { onBookAdded: () => void }) => {
//     const [formData, setFormData] = useState({
//         title: "",
//         author: "",
//         publishedDate: "",
//         genre: "",
//         description: "",
//         copiesAvailable: 1,
//     })
//     const [profileImage, setProfileImage] = useState<File | null>(null)
//     const [loading, setLoading] = useState(false)
//     const [dragActive, setDragActive] = useState(false)
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setLoading(true)
//
//         try {
//             const data = new FormData()
//             data.append("title", formData.title)
//             data.append("author", formData.author)
//             data.append("publishedDate", formData.publishedDate)
//             data.append("genre", formData.genre)
//             data.append("description", formData.description)
//             data.append("copiesAvailable", String(formData.copiesAvailable))
//             if (profileImage) {
//                 data.append("profileImage", profileImage)
//             }
//
//             await addBook(data)
//             toast.success("Book added successfully")
//             onBookAdded()
//             setFormData({
//                 title: "",
//                 author: "",
//                 publishedDate: "",
//                 genre: "",
//                 description: "",
//                 copiesAvailable: 1,
//             })
//             setProfileImage(null)
//         } catch (error: any) {
//             toast.error(error.response?.data?.message || "Failed to add book")
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     const handleDrag = (e: React.DragEvent) => {
//         e.preventDefault()
//         e.stopPropagation()
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true)
//         } else if (e.type === "dragleave") {
//             setDragActive(false)
//         }
//     }
//
//     const handleDrop = (e: React.DragEvent) => {
//         e.preventDefault()
//         e.stopPropagation()
//         setDragActive(false)
//
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             setProfileImage(e.dataTransfer.files[0])
//         }
//     }
//
//     const formFields = [
//         {
//             label: "Book Title",
//             name: "title",
//             type: "text",
//             icon: <MdTitle className="w-5 h-5" />,
//             placeholder: "Enter the book title",
//             required: true
//         },
//         {
//             label: "Author Name",
//             name: "author",
//             type: "text",
//             icon: <MdPerson className="w-5 h-5" />,
//             placeholder: "Enter author's name",
//             required: true
//         },
//         {
//             label: "Published Date",
//             name: "publishedDate",
//             type: "date",
//             icon: <MdCalendarToday className="w-5 h-5" />,
//             placeholder: "",
//             required: true
//         },
//         {
//             label: "Genre",
//             name: "genre",
//             type: "text",
//             icon: <MdCategory className="w-5 h-5" />,
//             placeholder: "e.g., Fiction, Science, History",
//             required: false
//         },
//         {
//             label: "Description",
//             name: "description",
//             type: "textarea",
//             icon: <MdDescription className="w-5 h-5" />,
//             placeholder: "Brief description of the book",
//             required: false
//         },
//         {
//             label: "Copies Available",
//             name: "copiesAvailable",
//             type: "number",
//             icon: <MdNumbers className="w-5 h-5" />,
//             placeholder: "Number of copies",
//             required: true
//         },
//     ]
//
//     return (
//         <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
//                 <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
//                         <MdBookmark className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                         <h2 className="text-2xl font-bold text-white">Add New Book</h2>
//                         <p className="text-indigo-100 text-sm">Fill in the details to add a book to the library</p>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {formFields.map(({ label, name, type, icon, placeholder, required }) => (
//                         <div key={name} className={type === "textarea" ? "md:col-span-2" : ""}>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 {label} {required && <span className="text-red-500">*</span>}
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <div className="text-gray-400">
//                                         {icon}
//                                     </div>
//                                 </div>
//                                 {type === "textarea" ? (
//                                     <textarea
//                                         name={name}
//                                         value={formData[name as keyof typeof formData]}
//                                         onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
//                                         placeholder={placeholder}
//                                         rows={4}
//                                         className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                         required={required}
//                                     />
//                                 ) : (
//                                     <input
//                                         type={type}
//                                         name={name}
//                                         value={formData[name as keyof typeof formData]}
//                                         onChange={(e) => setFormData((prev) => ({
//                                             ...prev,
//                                             [name]: type === "number" ? +e.target.value : e.target.value
//                                         }))}
//                                         placeholder={placeholder}
//                                         min={type === "number" ? 1 : undefined}
//                                         className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                         required={required}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* File Upload Section */}
//                 <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Book Cover Image
//                     </label>
//                     <div
//                         className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
//                             dragActive
//                                 ? "border-indigo-500 bg-indigo-50"
//                                 : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
//                         }`}
//                         onDragEnter={handleDrag}
//                         onDragLeave={handleDrag}
//                         onDragOver={handleDrag}
//                         onDrop={handleDrop}
//                     >
//                         <div className="text-center">
//                             <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
//                                 {profileImage ? (
//                                     <MdImage className="w-6 h-6 text-green-600" />
//                                 ) : (
//                                     <MdCloudUpload className="w-6 h-6 text-gray-400" />
//                                 )}
//                             </div>
//
//                             {profileImage ? (
//                                 <div>
//                                     <p className="text-sm font-medium text-green-700">
//                                         {profileImage.name}
//                                     </p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         Click to change or drag a new file
//                                     </p>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-700">
//                                         Drop an image here, or <span className="text-indigo-600">browse</span>
//                                     </p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         PNG, JPG, GIF up to 10MB
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
//                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                         />
//                     </div>
//                 </div>
//
//                 {/* Submit Button */}
//                 <div className="flex justify-end pt-6 border-t border-gray-200">
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
//                     >
//                         <span className="flex items-center space-x-2">
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     <span>Adding Book...</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <MdAdd className="w-5 h-5" />
//                                     <span>Add Book to Library</span>
//                                 </>
//                             )}
//                         </span>
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }
//
// export default AddBookForm


// import React, { useState } from "react"
// import { addBook } from "../services/bookService.ts"
// import Swal from "sweetalert2"
// import withReactContent from "sweetalert2-react-content"
// import {
//     MdTitle,
//     MdPerson,
//     MdCalendarToday,
//     MdCategory,
//     MdDescription,
//     MdNumbers,
//     MdCloudUpload,
//     MdImage,
//     MdAdd,
//     MdBookmark
// } from "react-icons/md"
//
// const MySwal = withReactContent(Swal)
//
// const AddBookForm = ({ onBookAdded }: { onBookAdded: () => void }) => {
//     const [formData, setFormData] = useState({
//         title: "",
//         author: "",
//         publishedDate: "",
//         genre: "",
//         description: "",
//         copiesAvailable: 1,
//     })
//     const [profileImage, setProfileImage] = useState<File | null>(null)
//     const [loading, setLoading] = useState(false)
//     const [dragActive, setDragActive] = useState(false)
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setLoading(true)
//
//         try {
//             const data = new FormData()
//             data.append("title", formData.title)
//             data.append("author", formData.author)
//             data.append("publishedDate", formData.publishedDate)
//             data.append("genre", formData.genre)
//             data.append("description", formData.description)
//             data.append("copiesAvailable", String(formData.copiesAvailable))
//             if (profileImage) {
//                 data.append("profileImage", profileImage)
//             }
//
//             await addBook(data)
//
//             await MySwal.fire({
//                 title: <p className="text-2xl">Success!</p>,
//                 html: <p className="text-lg">Book added successfully!</p>,
//                 icon: "success",
//                 confirmButtonColor: "#4f46e5",
//                 confirmButtonText: "Great!",
//                 background: "#ffffff",
//                 backdrop: `
//                     rgba(79, 70, 229, 0.4)
//                     url("/images/nyan-cat.gif")
//                     left top
//                     no-repeat
//                 `
//             })
//
//             onBookAdded()
//             setFormData({
//                 title: "",
//                 author: "",
//                 publishedDate: "",
//                 genre: "",
//                 description: "",
//                 copiesAvailable: 1,
//             })
//             setProfileImage(null)
//         } catch (error: any) {
//             await MySwal.fire({
//                 title: <p className="text-2xl">Error!</p>,
//                 html: <p className="text-lg">{error.response?.data?.message || "Failed to add book"}</p>,
//                 icon: "error",
//                 confirmButtonColor: "#dc2626",
//                 confirmButtonText: "Try Again",
//                 background: "#ffffff"
//             })
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     const handleDrag = (e: React.DragEvent) => {
//         e.preventDefault()
//         e.stopPropagation()
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true)
//         } else if (e.type === "dragleave") {
//             setDragActive(false)
//         }
//     }
//
//     const handleDrop = (e: React.DragEvent) => {
//         e.preventDefault()
//         e.stopPropagation()
//         setDragActive(false)
//
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             const file = e.dataTransfer.files[0]
//             if (file.size > 10 * 1024 * 1024) { // 10MB limit
//                 MySwal.fire({
//                     title: <p className="text-xl">File too large</p>,
//                     html: <p className="text-md">Please upload an image smaller than 10MB</p>,
//                     icon: "error",
//                     confirmButtonColor: "#dc2626"
//                 })
//                 return
//             }
//             if (!file.type.match("image.*")) {
//                 MySwal.fire({
//                     title: <p className="text-xl">Invalid file type</p>,
//                     html: <p className="text-md">Please upload an image file (PNG, JPG, GIF)</p>,
//                     icon: "error",
//                     confirmButtonColor: "#dc2626"
//                 })
//                 return
//             }
//             setProfileImage(file)
//         }
//     }
//
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0]
//             if (file.size > 10 * 1024 * 1024) {
//                 MySwal.fire({
//                     title: <p className="text-xl">File too large</p>,
//                     html: <p className="text-md">Please upload an image smaller than 10MB</p>,
//                     icon: "error",
//                     confirmButtonColor: "#dc2626"
//                 })
//                 return
//             }
//             if (!file.type.match("image.*")) {
//                 MySwal.fire({
//                     title: <p className="text-xl">Invalid file type</p>,
//                     html: <p className="text-md">Please upload an image file (PNG, JPG, GIF)</p>,
//                     icon: "error",
//                     confirmButtonColor: "#dc2626"
//                 })
//                 return
//             }
//             setProfileImage(file)
//         }
//     }
//
//     const formFields = [
//         {
//             label: "Book Title",
//             name: "title",
//             type: "text",
//             icon: <MdTitle className="w-5 h-5" />,
//             placeholder: "Enter the book title",
//             required: true
//         },
//         {
//             label: "Author Name",
//             name: "author",
//             type: "text",
//             icon: <MdPerson className="w-5 h-5" />,
//             placeholder: "Enter author's name",
//             required: true
//         },
//         {
//             label: "Published Date",
//             name: "publishedDate",
//             type: "date",
//             icon: <MdCalendarToday className="w-5 h-5" />,
//             placeholder: "",
//             required: true
//         },
//         {
//             label: "Genre",
//             name: "genre",
//             type: "text",
//             icon: <MdCategory className="w-5 h-5" />,
//             placeholder: "e.g., Fiction, Science, History",
//             required: false
//         },
//         {
//             label: "Description",
//             name: "description",
//             type: "textarea",
//             icon: <MdDescription className="w-5 h-5" />,
//             placeholder: "Brief description of the book",
//             required: false
//         },
//         {
//             label: "Copies Available",
//             name: "copiesAvailable",
//             type: "number",
//             icon: <MdNumbers className="w-5 h-5" />,
//             placeholder: "Number of copies",
//             required: true
//         },
//     ]
//
//     return (
//         <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-8 py-6">
//                 <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
//                         <MdBookmark className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                         <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Book</h2>
//                         <p className="text-indigo-100 text-sm">Fill in the details to add a book to the library</p>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                     {formFields.map(({ label, name, type, icon, placeholder, required }) => (
//                         <div key={name} className={type === "textarea" ? "md:col-span-2" : ""}>
//                             <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                                 {label} {required && <span className="text-red-500">*</span>}
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <div className="text-gray-400">
//                                         {icon}
//                                     </div>
//                                 </div>
//                                 {type === "textarea" ? (
//                                     <textarea
//                                         name={name}
//                                         value={formData[name as keyof typeof formData]}
//                                         onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
//                                         placeholder={placeholder}
//                                         rows={4}
//                                         className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                         required={required}
//                                     />
//                                 ) : (
//                                     <input
//                                         type={type}
//                                         name={name}
//                                         value={formData[name as keyof typeof formData]}
//                                         onChange={(e) => setFormData((prev) => ({
//                                             ...prev,
//                                             [name]: type === "number" ? +e.target.value : e.target.value
//                                         }))}
//                                         placeholder={placeholder}
//                                         min={type === "number" ? 1 : undefined}
//                                         className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                         required={required}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* File Upload Section */}
//                 <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                         Book Cover Image
//                     </label>
//                     <div
//                         className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 transition-all duration-200 ${
//                             dragActive
//                                 ? "border-indigo-500 bg-indigo-50"
//                                 : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
//                         }`}
//                         onDragEnter={handleDrag}
//                         onDragLeave={handleDrag}
//                         onDragOver={handleDrag}
//                         onDrop={handleDrop}
//                     >
//                         <div className="text-center">
//                             <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
//                                 {profileImage ? (
//                                     <MdImage className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
//                                 ) : (
//                                     <MdCloudUpload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
//                                 )}
//                             </div>
//
//                             {profileImage ? (
//                                 <div>
//                                     <p className="text-sm font-medium text-green-700 truncate max-w-xs mx-auto">
//                                         {profileImage.name}
//                                     </p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         Click to change or drag a new file
//                                     </p>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-700">
//                                         Drop an image here, or <span className="text-indigo-600">browse</span>
//                                     </p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         PNG, JPG, GIF up to 10MB
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                         />
//                     </div>
//                 </div>
//
//                 {/* Submit Button */}
//                 <div className="flex justify-end pt-4 sm:pt-6 border-t border-gray-200">
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="group relative w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
//                     >
//                         <span className="flex items-center justify-center space-x-2">
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     <span className="text-sm sm:text-base">Adding Book...</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <MdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//                                     <span className="text-sm sm:text-base">Add Book to Library</span>
//                                 </>
//                             )}
//                         </span>
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }
//
// export default AddBookForm

import React, { useState } from "react"
import { addBook } from "../services/bookService.ts"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {
    MdTitle,
    MdPerson,
    MdCalendarToday,
    MdCategory,
    MdDescription,
    MdNumbers,
    MdCloudUpload,
    MdImage,
    MdAdd,
    MdBookmark,
    MdError,
    // MdCheckCircle
} from "react-icons/md"

const MySwal = withReactContent(Swal)

interface FormErrors {
    title?: string;
    author?: string;
    publishedDate?: string;
    genre?: string;
    description?: string;
    copiesAvailable?: string;
    profileImage?: string;
}

const AddBookForm = ({ onBookAdded }: { onBookAdded: () => void }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publishedDate: "",
        genre: "",
        description: "",
        copiesAvailable: 1,
    })
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        } else if (formData.title.length > 100) {
            newErrors.title = "Title must be less than 100 characters"
        }

        if (!formData.author.trim()) {
            newErrors.author = "Author is required"
        } else if (formData.author.length > 50) {
            newErrors.author = "Author name must be less than 50 characters"
        }

        if (!formData.publishedDate) {
            newErrors.publishedDate = "Published date is required"
        } else {
            const date = new Date(formData.publishedDate)
            const currentDate = new Date()
            if (date > currentDate) {
                newErrors.publishedDate = "Published date cannot be in the future"
            }
        }

        if (formData.genre && formData.genre.length > 30) {
            newErrors.genre = "Genre must be less than 30 characters"
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = "Description must be less than 500 characters"
        }

        if (formData.copiesAvailable < 1) {
            newErrors.copiesAvailable = "Must have at least 1 copy"
        } else if (formData.copiesAvailable > 1000) {
            newErrors.copiesAvailable = "Cannot have more than 1000 copies"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const showSuccessNotification = () => {
        MySwal.fire({
            title: <p className="text-2xl">Success!</p>,
            html: <p className="text-lg">Book added successfully!</p>,
            icon: "success",
            confirmButtonColor: "#4f46e5",
            confirmButtonText: "Great!",
            background: "#ffffff",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }

    const showErrorNotification = (message: string) => {
        MySwal.fire({
            title: <p className="text-xl">Error!</p>,
            html: <p className="text-lg">{message}</p>,
            icon: "error",
            confirmButtonColor: "#dc2626",
            background: "#ffffff",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true
        })
    }

    const showFieldError = (fieldName: string, message: string) => {
        setErrors(prev => ({ ...prev, [fieldName]: message }))
        showErrorNotification(message)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            showErrorNotification("Please fix the errors in the form")
            return
        }

        setLoading(true)

        try {
            const data = new FormData()
            data.append("title", formData.title)
            data.append("author", formData.author)
            data.append("publishedDate", formData.publishedDate)
            data.append("genre", formData.genre)
            data.append("description", formData.description)
            data.append("copiesAvailable", String(formData.copiesAvailable))

            if (profileImage) {
                if (profileImage.size > 10 * 1024 * 1024) {
                    showFieldError("profileImage", "Image must be smaller than 10MB")
                    return
                }
                if (!profileImage.type.match("image.*")) {
                    showFieldError("profileImage", "Only image files are allowed")
                    return
                }
                data.append("profileImage", profileImage)
            }

            await addBook(data)

            showSuccessNotification()
            onBookAdded()

            // Reset form
            setFormData({
                title: "",
                author: "",
                publishedDate: "",
                genre: "",
                description: "",
                copiesAvailable: 1,
            })
            setProfileImage(null)
            setErrors({})
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to add book"
            showErrorNotification(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            setProfileImage(file)
            setErrors(prev => ({ ...prev, profileImage: undefined }))
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setProfileImage(file)
            setErrors(prev => ({ ...prev, profileImage: undefined }))
        }
    }

    const formFields = [
        {
            label: "Book Title",
            name: "title",
            type: "text",
            icon: <MdTitle className="w-5 h-5" />,
            placeholder: "Enter the book title",
            required: true
        },
        {
            label: "Author Name",
            name: "author",
            type: "text",
            icon: <MdPerson className="w-5 h-5" />,
            placeholder: "Enter author's name",
            required: true
        },
        {
            label: "Published Date",
            name: "publishedDate",
            type: "date",
            icon: <MdCalendarToday className="w-5 h-5" />,
            placeholder: "",
            required: true
        },
        {
            label: "Genre",
            name: "genre",
            type: "text",
            icon: <MdCategory className="w-5 h-5" />,
            placeholder: "e.g., Fiction, Science, History",
            required: false
        },
        {
            label: "Description",
            name: "description",
            type: "textarea",
            icon: <MdDescription className="w-5 h-5" />,
            placeholder: "Brief description of the book",
            required: false
        },
        {
            label: "Copies Available",
            name: "copiesAvailable",
            type: "number",
            icon: <MdNumbers className="w-5 h-5" />,
            placeholder: "Number of copies",
            required: true
        },
    ]

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-8 py-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <MdBookmark className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Book</h2>
                        <p className="text-indigo-100 text-sm">Fill in the details to add a book to the library</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {formFields.map(({ label, name, type, icon, placeholder, required }) => (
                        <div key={name} className={type === "textarea" ? "md:col-span-2" : ""}>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="text-gray-400">
                                        {icon}
                                    </div>
                                </div>
                                {type === "textarea" ? (
                                    <textarea
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                                            setErrors(prev => ({ ...prev, [name]: undefined }))
                                        }}
                                        placeholder={placeholder}
                                        rows={4}
                                        className={`block w-full pl-10 pr-3 py-2 sm:py-3 border ${
                                            errors[name as keyof typeof errors]
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200`}
                                        required={required}
                                    />
                                ) : (
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                [name]: type === "number" ? +e.target.value : e.target.value
                                            }))
                                            setErrors(prev => ({ ...prev, [name]: undefined }))
                                        }}
                                        placeholder={placeholder}
                                        min={type === "number" ? 1 : undefined}
                                        max={type === "number" ? 1000 : undefined}
                                        className={`block w-full pl-10 pr-3 py-2 sm:py-3 border ${
                                            errors[name as keyof typeof errors]
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200`}
                                        required={required}
                                    />
                                )}
                                {errors[name as keyof typeof errors] && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <MdError className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors[name as keyof typeof errors] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <MdError className="mr-1 w-4 h-4" />
                                    {errors[name as keyof typeof errors]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* File Upload Section */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Book Cover Image
                    </label>
                    <div
                        className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 transition-all duration-200 ${
                            dragActive
                                ? "border-indigo-500 bg-indigo-50"
                                : errors.profileImage
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="text-center">
                            <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                {profileImage ? (
                                    <MdImage className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                ) : (
                                    <MdCloudUpload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                )}
                            </div>

                            {profileImage ? (
                                <div>
                                    <p className="text-sm font-medium text-green-700 truncate max-w-xs mx-auto">
                                        {profileImage.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Click to change or drag a new file
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        Drop an image here, or <span className="text-indigo-600">browse</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    {errors.profileImage && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <MdError className="mr-1 w-4 h-4" />
                            {errors.profileImage}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 sm:pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="flex items-center justify-center space-x-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="text-sm sm:text-base">Adding Book...</span>
                                </>
                            ) : (
                                <>
                                    <MdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base">Add Book to Library</span>
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddBookForm