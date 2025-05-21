import React, { useEffect, useState } from "react";
import {
    FaTimesCircle,
    FaSave,
    FaHeading,
    FaAlignLeft,
    FaImage,
    FaTags,
} from "react-icons/fa";

const UpdateGallery = ({ selectedItemId, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
    });

    useEffect(() => {
        fetch("/imageGallery.json")
            .then((res) => res.json())
            .then((data) => {
                const selectedItem = data.find((item) => item._id === selectedItemId);
                if (selectedItem) {
                    setFormData({
                        title: selectedItem.title || "",
                        description: selectedItem.description || "",
                        imageUrl: selectedItem.imageUrl || "",
                        category: selectedItem.category || "",
                    });
                }
            })
            .catch((error) => console.error("Error fetching gallery data:", error));
    }, [selectedItemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, description, imageUrl, category } = formData;
        if (!title || !description || !imageUrl || !category) {
            alert("All fields are required.");
            return;
        }

        const updatedItem = {
            sl: selectedItemId,
            ...formData,
        };

        try {
            const response = await fetch(`/api/gallery/${selectedItemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                throw new Error("Failed to update gallery item");
            }

            const data = await response.json();
            onUpdate(data);
        } catch (error) {
            alert("Error updating item: " + error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-2 mb-8">
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
                Update Gallery Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-md font-bold text-blue-600 mb-2">
                        <FaHeading className="font-bold" /> Title{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-md font-bold text-blue-600 mb-2">
                        <FaAlignLeft className="font-bold" /> Description{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-blue-300 rounded-md p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-md font-bold text-blue-600 mb-2">
                        <FaImage className="font-bold" /> Image URL{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-md font-bold text-blue-600 mb-2">
                        <FaTags className="font-bold" /> Category{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-blue-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Category</option>
                        <option value="Event">Event</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Resource">Resource</option>
                        <option value="Program">Program</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-md transition"
                    >
                        <FaTimesCircle size={20} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
                    >
                        <FaSave size={20} />
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateGallery;
