import React, { useState } from "react"
import { addBook } from "../services/bookService.ts"
import toast from "react-hot-toast"

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

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">Add New Book</h2>
            {[
                { label: "Title", name: "title", type: "text" },
                { label: "Author", name: "author", type: "text" },
                { label: "Published Date", name: "publishedDate", type: "date" },
                { label: "Genre", name: "genre", type: "text" },
                { label: "Description", name: "description", type: "text" },
                { label: "Copies Available", name: "copiesAvailable", type: "number" },
            ].map(({ label, name, type }) => (
                <div key={name}>
                    <label className="block text-sm font-medium">{label}</label>
                    <input
                        type={type}
                        name={name}
                        value={formData[name as keyof typeof formData]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [name]: type === "number" ? +e.target.value : e.target.value }))}
                        className="border border-gray-300 rounded w-full p-2 mt-1"
                        required={name !== "description" && name !== "genre"}
                    />
                </div>
            ))}

            <div>
                <label className="block text-sm font-medium">Cover Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
                    className="mt-1"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                {loading ? "Adding..." : "Add Book"}
            </button>
        </form>
    )
}

export default AddBookForm
