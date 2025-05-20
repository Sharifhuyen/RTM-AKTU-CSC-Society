import React, { useEffect, useState } from "react";

const UpdateEvent = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetch("/cscEvents.json")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    const handleSelect = (event) => {
        setSelectedEvent(event);
        setFormData(event);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated event data:", formData);
        // Logic to submit updated data to server or local state
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
                Update Event
            </h1>

            <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Select an Event</label>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName || ""}
                        onChange={handleChange}
                        placeholder="Event Name"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <input
                        type="text"
                        name="eventImageUrl"
                        value={formData.eventImageUrl || ""}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <input
                        type="text"
                        name="eventDay"
                        value={formData.eventDay || ""}
                        onChange={handleChange}
                        placeholder="Event Day"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <textarea
                        name="eventDescription"
                        value={formData.eventDescription || ""}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Event Description"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    ></textarea>

                    <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <input
                        type="text"
                        name="time"
                        value={formData.time || ""}
                        onChange={handleChange}
                        placeholder="Time"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <input
                        type="text"
                        name="presentedTime"
                        value={formData.presentedTime || ""}
                        onChange={handleChange}
                        placeholder="Presented Time"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateEvent;