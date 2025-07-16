import React from "react";
import type {Reader} from "../types/Reader.ts";

interface Props {
    readers: Reader[];
    onEdit: (reader: Reader) => void;
    onDelete: (id: string) => void;
}

const ReaderTable: React.FC<Props> = ({ readers, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">Member ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Phone</th>
                    <th className="py-2 px-4 border">Address</th>
                    <th className="py-2 px-4 border">DOB</th>
                    <th className="py-2 px-4 border">NIC</th>
                    <th className="py-2 px-4 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {readers.map(reader => (
                    <tr key={reader._id} className="text-center">
                        <td className="py-2 px-4 border">{reader.memberId}</td>
                        <td className="py-2 px-4 border">{reader.name}</td>
                        <td className="py-2 px-4 border">{reader.email}</td>
                        <td className="py-2 px-4 border">{reader.phone || "-"}</td>
                        <td className="py-2 px-4 border">{reader.address || "-"}</td>
                        <td className="py-2 px-4 border">{reader.dateOfBirth?.slice(0, 10) || "-"}</td>
                        <td className="py-2 px-4 border">{reader.nic}</td>
                        <td className="py-2 px-4 border space-x-2">
                            <button
                                onClick={() => onEdit(reader)}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(reader._id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReaderTable;
