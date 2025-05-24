import React, { useEffect, useState } from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaImage,
    FaHeading,
    FaAlignLeft,
    FaListUl,
    FaSave
} from "react-icons/fa";

const UpdateEvent = ({ onUpdateSuccess, onClose }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetch("https://rtm-aktu-csc-society-server-side.onrender.com/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    const getDayFromDate = (dateStr) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dateStr ? days[new Date(dateStr).getDay()] : "";
    };

    const handleSelect = (event) => {
        setSelectedEvent(event);
        setFormData({ ...event, eventDay: getDayFromDate(event.eventDate) });
        setErrorMessage("");
        setShowAlert(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        if (name === "eventDate") {
            updatedData.eventDay = getDayFromDate(value);
        }
        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            eventName,
            eventImageUrl,
            eventDate,
            eventDescription,
            eventDay,
            location,
            time,
            presentedTime,
            _id,
        } = formData;

        if (!eventName || !eventImageUrl || !eventDate || !eventDescription || !location || !time || !presentedTime) {
            setErrorMessage("All fields are required.");
            setShowAlert(true);
            return;
        }

        try {
            const updatedEvent = {
                eventName,
                eventImageUrl,
                eventDate,
                eventDescription,
                eventDay,
                location,
                time,
                presentedTime,
                updatedAt: new Date().toISOString(),
            };

            const response = await fetch(`https://rtm-aktu-csc-society-server-side.onrender.com/event/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEvent),
            });

            if (!response.ok) {
                throw new Error("Failed to update event");
            }

            const result = await response.json();

            if (onUpdateSuccess) onUpdateSuccess(result);
            if (onClose) onClose();

        } catch (error) {
            console.error("Update error:", error);
            setErrorMessage("An error occurred while updating the event.");
            setShowAlert(true);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Update Event</h1>

            {showAlert && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                    <FaListUl className="inline-block mr-2 text-purple-600" />
                    Select an Event
                </label>
                <select
                    onChange={(e) => handleSelect(events.find(ev => ev.eventName === e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">-- Select --</option>
                    {events.map((event, index) => (
                        <option key={index} value={event.eventName}>
                            {event.eventName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedEvent && (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaHeading className="inline-block mr-2 text-purple-600" />
                            Event Name
                        </label>
                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaImage className="inline-block mr-2 text-purple-600" />
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="eventImageUrl"
                            value={formData.eventImageUrl || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                <FaCalendarAlt className="inline-block mr-2 text-purple-600" />
                                Event Date
                            </label>
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                <FaListUl className="inline-block mr-2 text-purple-600" />
                                Event Day
                            </label>
                            <input
                                type="text"
                                name="eventDay"
                                value={formData.eventDay || ""}
                                disabled
                                className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaAlignLeft className="inline-block mr-2 text-purple-600" />
                            Event Description
                        </label>
                        <textarea
                            name="eventDescription"
                            value={formData.eventDescription || ""}
                            onChange={handleChange}
                            rows="6"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaMapMarkerAlt className="inline-block mr-2 text-purple-600" />
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                <FaClock className="inline-block mr-2 text-purple-600" />
                                Time
                            </label>
                            <input
                                type="text"
                                name="time"
                                value={formData.time || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                <FaClock className="inline-block mr-2 text-purple-600" />
                                Presented Time
                            </label>
                            <input
                                type="text"
                                name="presentedTime"
                                value={formData.presentedTime || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                        <FaSave /> Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateEvent;
