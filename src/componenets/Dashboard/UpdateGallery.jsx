import React, { useEffect, useState } from "react";

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
                const selectedItem = data.find((item) => item.sl === selectedItemId);
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

    const handleSubmit = (e) => {
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

        onUpdate(updatedItem);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                Update Gallery Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL *</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select a Category</option>
                        <option value="Event">Event</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Resource">Resource</option>
                        <option value="Program">Program</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateGallery;
