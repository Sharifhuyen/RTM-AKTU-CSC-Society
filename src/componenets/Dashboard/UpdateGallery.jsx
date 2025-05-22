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
        _id: "",
        title: "",
        description: "",
        imageUrl: "",
        category: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/galleries")
            .then((res) => res.json())
            .then((data) => {
                const selectedItem = data.find((item) => item._id === selectedItemId);
                if (selectedItem) {
                    setFormData({
                        _id: selectedItem._id,
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
        const { _id, title, description, imageUrl, category } = formData;

        if (!title || !description || !imageUrl || !category) {
            setErrorMessage("All fields are required.");
            setShowAlert(true);
            return;
        }

        const updatedItem = {
            title,
            description,
            imageUrl,
            category,
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch(`http://localhost:5000/galleries/${_id}`, {
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
            if (onUpdate) onUpdate(data);
        } catch (error) {
            console.error("Update error:", error);
            setErrorMessage("An error occurred while updating the gallery item.");
            setShowAlert(true);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-2 mb-8">
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
                Update Gallery Item
            </h2>
            {showAlert && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="flex items-center gap-2 font-bold text-blue-600 mb-2">
                        <FaHeading /> Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="block w-full border border-blue-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 font-bold text-blue-600 mb-2">
                        <FaAlignLeft /> Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="block w-full border border-blue-300 rounded-md p-3 resize-y focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label className="flex items-center gap-2 font-bold text-blue-600 mb-2">
                        <FaImage /> Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="block w-full border border-blue-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 font-bold text-blue-600 mb-2">
                        <FaTags /> Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="block w-full border border-blue-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-blue-500"
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
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md"
                    >
                        <FaTimesCircle size={20} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
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
