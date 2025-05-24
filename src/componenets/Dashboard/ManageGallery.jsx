import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import UpdateGallery from "./UpdateGallery"; // Adjust path if needed

const ManageGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetch("https://rtm-aktu-csc-society-server-side.onrender.com/galleries")
            .then((res) => res.json())
            .then((data) => setGallery(data))
            .catch((err) => {
                console.error("Error fetching gallery:", err);
                showToast("Failed to fetch gallery items.", "error");
            });
    }, [gallery]);

    const showToast = (message, type = "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://rtm-aktu-csc-society-server-side.onrender.com/galleries/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Delete failed");

            setGallery((prev) => prev.filter((item) => item._id !== id));
            if (selectedItem?._id === id) setSelectedItem(null);
            showToast("Gallery item deleted.", "success");
        } catch (error) {
            console.error("Delete error:", error);
            showToast("Failed to delete item.", "error");
        }
    };

    const handleUpdate = (id) => {
        const itemToEdit = gallery.find((item) => item._id === id);
        setSelectedItem(itemToEdit);
        setShowUpdateModal(true);
    };

    const handleViewDetails = (item) => {
        setSelectedItem(item);
    };

    const handleUpdateSuccess = (updatedItem) => {
        setGallery((prev) =>
            prev.map((item) =>
                item._id === updatedItem._id ? { ...item, ...updatedItem } : item
            )
        );
        if (selectedItem?._id === updatedItem._id) {
            setSelectedItem((prev) => ({ ...prev, ...updatedItem }));
        }
        showToast("Gallery item updated.", "success");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 relative">

            {/* Toast Alert */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 w-fit px-4 py-3 rounded shadow-lg text-white transition-all duration-500 ${toast.type === "error" ? "bg-red-600" : "bg-green-600"
                    }`}>
                    {toast.message}
                </div>
            )}

            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
                Manage Gallery
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Gallery Cards */}
                <div className="space-y-4">
                    {gallery.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-l-4 border-blue-600"
                            onClick={() => handleViewDetails(item)}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-sm text-blue-600 font-medium mt-1">
                                        Category: {item.category}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Uploaded by: {item.uploadedBy}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Date: {item.createdAt.split("T")[0]}
                                    </p>
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

                {/* Right: Details */}
                <div className="bg-white p-5 rounded-lg shadow-md min-h-[200px] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">
                        Gallery Item Details
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
                            <p className="text-gray-500 mb-1">
                                Category: {selectedItem.category}
                            </p>
                            <p className="text-gray-500 mb-1">
                                Uploaded By: {selectedItem.uploadedBy}
                            </p>
                            <p className="text-gray-500">
                                Date: {selectedItem.dateUploaded}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Select an item to view details</p>
                    )}
                </div>
            </div>

            {/* Update Modal */}
            {showUpdateModal && selectedItem && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto"
                    style={{ padding: "2rem" }} // optional: add padding so modal is not stuck to edges on small screens
                >
                    <div
                        className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative p-6"
                        style={{
                            maxHeight: "80vh",  // limit max height of modal
                            overflowY: "auto",  // enable vertical scrolling inside modal
                        }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => {
                                setShowUpdateModal(false);
                                setSelectedItem(null);
                            }}
                        >
                            ✕
                        </button>
                        <UpdateGallery
                            selectedItemId={selectedItem._id}
                            onCancel={() => {
                                setSelectedItem(null);
                                setShowUpdateModal(false);
                            }}
                            onUpdate={(updatedItem) => {
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
