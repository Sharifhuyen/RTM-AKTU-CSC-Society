import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import UpdateEvent from "../Dashboard/UpdateEvent"; // Adjust path as needed

const ManageEvent = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [toast, setToast] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => {
                console.error("Error fetching events:", err);
                showToast("Failed to fetch events.", "error");
            });
    }, [events]);

    const showToast = (message, type = "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/event/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete event");
            }

            // Update local state after successful deletion
            setEvents((prev) => prev.filter((event) => event._id !== id));

            if (selectedEvent?._id === id) {
                setSelectedEvent(null);
            }

            showToast("Event deleted successfully.", "success");
        } catch (error) {
            console.error("Delete error:", error);
            showToast("Failed to delete event.", "error");
        }
    };


    const handleUpdate = (eventName) => {
        const eventToEdit = events.find(event => event.eventName === eventName);
        setSelectedEvent(eventToEdit);
        setShowUpdateModal(true);
    };

    const handleViewDetails = (event) => {
        setSelectedEvent(event);
    };

    const handleUpdateSuccess = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.eventName === updatedEvent.eventName
                    ? { ...event, ...updatedEvent }
                    : event
            )
        );

        if (selectedEvent?.eventName === updatedEvent.eventName) {
            setSelectedEvent((prev) => ({
                ...prev,
                ...updatedEvent
            }));
        }

        showToast("Event updated successfully.", "success");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
            {/* Toast Alert */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 w-fit px-4 py-3 rounded shadow-lg text-white transition-all duration-500 ${toast.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
                    {toast.message}
                </div>
            )}

            <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
                Manage Events
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Event List */}
                <div className="space-y-4">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-l-4 border-purple-600"
                            onClick={() => handleViewDetails(event)}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        {event.eventName}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {event.eventDate} ({event.eventDay})
                                    </p>
                                    <p className="text-sm text-purple-600 font-medium">{event.location}</p>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdate(event.eventName);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(selectedEvent._id);
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

                {/* Right: Event Details */}
                <div className="bg-white p-5 rounded-lg shadow-md min-h-[200px] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2">
                        Event Details
                    </h2>

                    {selectedEvent ? (
                        <div>
                            {selectedEvent.eventImageUrl && (
                                <img
                                    src={selectedEvent.eventImageUrl}
                                    alt={selectedEvent.eventName}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h3 className="text-2xl font-bold mb-2">{selectedEvent.eventName}</h3>
                            <p className="text-gray-700 mb-1">
                                <strong>Date:</strong> {selectedEvent.eventDate} ({selectedEvent.eventDay})
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Time:</strong> {selectedEvent.time}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Presented Time:</strong> {selectedEvent.presentedTime}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Location:</strong> {selectedEvent.location}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Uploaded By:</strong> {selectedEvent.uploadedBy}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Created Date:</strong>{" "}
                                {new Date(selectedEvent.createdDate).toLocaleString()}
                            </p>
                            <div
                                className="prose prose-sm max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: selectedEvent.eventDescription,
                                }}
                            ></div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Select an event to view details</p>
                    )}
                </div>
            </div>

            {/* Update Event Modal */}
            {showUpdateModal && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-6">

                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowUpdateModal(false)}
                        >
                            ✕
                        </button>
                        <UpdateEvent
                            event={selectedEvent}
                            onClose={() => {
                                setSelectedEvent(null);
                                setShowUpdateModal(false);
                            }}
                            onUpdateSuccess={(updatedEvent) => {
                                handleUpdateSuccess(updatedEvent);
                                setShowUpdateModal(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvent;
