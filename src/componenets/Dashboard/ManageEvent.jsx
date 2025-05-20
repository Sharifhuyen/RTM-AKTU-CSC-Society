import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ManageEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("/cscEvents.json")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    const handleDelete = (eventName) => {
        console.log("Delete event:", eventName);
        // Logic to delete
    };

    const handleUpdate = (eventName) => {
        console.log("Update event:", eventName);
        // Logic to update
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
                Manage Events
            </h1>
            <div className="space-y-4">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white shadow-md rounded-lg p-6 gap-4"
                    >
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{event.eventName}</h2>
                            <p className="text-sm text-gray-600">{event.eventDate} ({event.eventDay})</p>
                            <p className="text-sm text-blue-600 font-medium">{event.location}</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => handleUpdate(event.eventName)}
                                className="text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaEdit size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(event.eventName)}
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

export default ManageEvent;
