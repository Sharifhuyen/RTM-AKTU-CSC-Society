import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateGallery from "../Dashboard/UpdateGallery";

const ManageGallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetch("/imageGallery.json")
            .then((res) => res.json())
            .then((data) => setGalleryItems(data))
            .catch((error) => {
                console.error("Error loading gallery:", error);
                showToast("Failed to load gallery.", "error");
            });
    }, []);

    const showToast = (message, type = "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleUpdate = (_id) => {
        const itemToEdit = galleryItems.find(item => item._id === _id);
        setSelectedItem(itemToEdit);
        setShowUpdateModal(true);
    };

    const handleDelete = (_id) => {
        setGalleryItems(prev => prev.filter(item => item._id !== _id));
        if (selectedItem?._id === _id) setSelectedItem(null);
        showToast("Gallery item deleted successfully.", "success");
    };

    const handleUpdateSuccess = (updatedItem) => {
        setGalleryItems((prev) =>
            prev.map((item) =>
                item._id === updatedItem._id ? { ...item, ...updatedItem } : item
            )
        );
        if (selectedItem?._id === updatedItem._id) {
            setSelectedItem(updatedItem);
        }
        showToast("Gallery item updated successfully.", "success");
    };

    const handleViewDetails = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white ${toast.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
                    {toast.message}
                </div>
            )}

            <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
                Manage Gallery
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gallery List */}
                <div className="space-y-4">
                    {galleryItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-l-4 border-purple-600"
                            onClick={() => handleViewDetails(item)}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-purple-600 font-medium">#{item.category}</p>
                                    <p className="text-sm text-gray-600">By {item.uploadedBy}</p>
                                    <p className="text-xs text-gray-400 font-bold">Description: {item.description}</p>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdate(item._id);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item._id);
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gallery Details */}
                <div className="bg-white p-5 rounded-lg shadow-md min-h-[200px] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2">
                        Gallery Details
                    </h2>
                    {selectedItem ? (
                        <div>
                            {selectedItem.imageUrl && (
                                <img
                                    src={selectedItem.imageUrl}
                                    alt={selectedItem.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                            <p className="text-gray-700 mb-2">{selectedItem.description}</p>
                            <p className="text-blue-600 font-medium">#{selectedItem.category}</p>
                            <p className="text-sm text-gray-600">
                                Uploaded by: {selectedItem.uploadedBy} on {selectedItem.dateUploaded}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Select a gallery item to view details</p>
                    )}
                </div>
            </div>

            {/* Update Modal */}
            {showUpdateModal && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative p-6 max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowUpdateModal(false)}
                        >
                            ✕
                        </button>
                        <UpdateGallery
                            item={selectedItem}
                            onClose={() => {
                                setSelectedItem(null);
                                setShowUpdateModal(false);
                            }}
                            onUpdateSuccess={(updatedItem) => {
                                handleUpdateSuccess(updatedItem);
                                setShowUpdateModal(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGallery;
