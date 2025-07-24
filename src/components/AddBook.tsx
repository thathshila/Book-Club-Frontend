// import React, { useState } from "react"
// import { addBook } from "../services/bookService.ts"
// import toast from "react-hot-toast"
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
//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow">
//             <h2 className="text-xl font-bold">Add New Book</h2>
//             {[
//                 { label: "Title", name: "title", type: "text" },
//                 { label: "Author", name: "author", type: "text" },
//                 { label: "Published Date", name: "publishedDate", type: "date" },
//                 { label: "Genre", name: "genre", type: "text" },
//                 { label: "Description", name: "description", type: "text" },
//                 { label: "Copies Available", name: "copiesAvailable", type: "number" },
//             ].map(({ label, name, type }) => (
//                 <div key={name}>
//                     <label className="block text-sm font-medium">{label}</label>
//                     <input
//                         type={type}
//                         name={name}
//                         value={formData[name as keyof typeof formData]}
//                         onChange={(e) => setFormData((prev) => ({ ...prev, [name]: type === "number" ? +e.target.value : e.target.value }))}
//                         className="border border-gray-300 rounded w-full p-2 mt-1"
//                         required={name !== "description" && name !== "genre"}
//                     />
//                 </div>
//             ))}
//
//             <div>
//                 <label className="block text-sm font-medium">Cover Image</label>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
//                     className="mt-1"
//                 />
//             </div>
//
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//             >
//                 {loading ? "Adding..." : "Add Book"}
//             </button>
//         </form>
//     )
// }
//
// export default AddBookForm
import React, { useState } from "react"
import { addBook } from "../services/bookService.ts"
import toast from "react-hot-toast"
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
    MdBookmark
} from "react-icons/md"

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
                data.append("profileImage", profileImage)
            }

            await addBook(data)
            toast.success("Book added successfully")
            onBookAdded()
            setFormData({
                title: "",
                author: "",
                publishedDate: "",
                genre: "",
                description: "",
                copiesAvailable: 1,
            })
            setProfileImage(null)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add book")
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
            setProfileImage(e.dataTransfer.files[0])
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <MdBookmark className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Add New Book</h2>
                        <p className="text-indigo-100 text-sm">Fill in the details to add a book to the library</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map(({ label, name, type, icon, placeholder, required }) => (
                        <div key={name} className={type === "textarea" ? "md:col-span-2" : ""}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                        onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
                                        placeholder={placeholder}
                                        rows={4}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                        required={required}
                                    />
                                ) : (
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={(e) => setFormData((prev) => ({
                                            ...prev,
                                            [name]: type === "number" ? +e.target.value : e.target.value
                                        }))}
                                        placeholder={placeholder}
                                        min={type === "number" ? 1 : undefined}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                        required={required}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* File Upload Section */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Book Cover Image
                    </label>
                    <div
                        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                            dragActive
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="text-center">
                            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                {profileImage ? (
                                    <MdImage className="w-6 h-6 text-green-600" />
                                ) : (
                                    <MdCloudUpload className="w-6 h-6 text-gray-400" />
                                )}
                            </div>

                            {profileImage ? (
                                <div>
                                    <p className="text-sm font-medium text-green-700">
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
                            onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="flex items-center space-x-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Adding Book...</span>
                                </>
                            ) : (
                                <>
                                    <MdAdd className="w-5 h-5" />
                                    <span>Add Book to Library</span>
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