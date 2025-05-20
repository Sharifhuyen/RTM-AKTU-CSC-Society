import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageGallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        fetch("/imageGallery.json")
            .then((res) => res.json())
            .then((data) => setGalleryItems(data))
            .catch((error) => console.error("Error loading gallery:", error));
    }, []);

    const handleUpdate = (id) => {
        console.log("Update gallery item with id:", id);
        // Add update logic here
    };

    const handleDelete = (id) => {
        console.log("Delete gallery item with id:", id);
        // Add delete logic here
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
                Manage Gallery
            </h1>
            <div className="space-y-6">
                {galleryItems.map((item) => (
                    <div
                        key={item.sl}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white shadow-md rounded-lg p-4 gap-4"
                    >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full lg:w-40 h-28 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-sm text-blue-600 font-medium">#{item.category}</p>
                                <p className="text-sm text-gray-500">
                                    Uploaded by: {item.uploadedBy} on {item.dateUploaded}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => handleUpdate(item.sl)}
                                className="text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaEdit size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.sl)}
                                className="text-red-600 hover:text-red-800 transition"
                            >
                                <FaTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageGallery;
