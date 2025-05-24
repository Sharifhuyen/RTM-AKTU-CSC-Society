import { useState } from 'react';
import { FaImage, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaHeading, FaAlignLeft } from 'react-icons/fa';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventImageUrl: '',
        eventDate: '',
        eventDescription: '',
        location: '',
        time: '',
        presentedTime: '',
        createdDate: new Date().toISOString(),
        uploadedBy: 'Sharif Ahmad Huyen'
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const presentedTimeOptions = [
        '09:00 AM', '09:30 AM', '10:00 AM',
        '10:15 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '01:00 PM', '02:00 PM',
        '03:00 PM', '04:00 PM'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const dateObj = new Date(eventData.eventDate);
            const eventDay = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

            const eventWithDay = {
                ...eventData,
                eventDay
            };

            const response = await fetch('https://rtm-aktu-csc-society-server-side.onrender.com/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventWithDay),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || 'Failed to create event');
            }

            setMessage('✅ Event created successfully!');
            setEventData({
                eventName: '',
                eventImageUrl: '',
                eventDate: '',
                eventDescription: '',
                location: '',
                time: '',
                presentedTime: '',
                createdDate: new Date().toISOString(),
                uploadedBy: 'Sharif Ahmad Huyen'
            });
        } catch (err) {
            console.error('Server Error:', err.message);
            setMessage(`❌ Failed to create event. ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Event</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaHeading className="mr-1" /> Event Name *
                        </label>
                        <input
                            type="text"
                            name="eventName"
                            value={eventData.eventName}
                            onChange={handleChange}
                            placeholder="Enter event name"
                            required
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md placeholder-blue-400"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaImage className="mr-1" /> Image URL *
                        </label>
                        <input
                            type="url"
                            name="eventImageUrl"
                            value={eventData.eventImageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            required
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md placeholder-blue-400"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaCalendarAlt className="mr-1" /> Date *
                        </label>
                        <input
                            type="date"
                            name="eventDate"
                            value={eventData.eventDate}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaClock className="mr-1" /> Time *
                        </label>
                        <input
                            type="text"
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            placeholder="e.g., 10:00 AM - 6:00 PM"
                            required
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md placeholder-blue-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaClock className="mr-1" /> Presented Time (optional)
                        </label>
                        <select
                            name="presentedTime"
                            value={eventData.presentedTime}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md"
                        >
                            <option value="">-- Optional --</option>
                            {presentedTimeOptions.map((time, idx) => (
                                <option key={idx} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaMapMarkerAlt className="mr-1" /> Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            placeholder="Enter event location"
                            required
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md placeholder-blue-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-bold text-blue-700">
                            <FaAlignLeft className="mr-1" /> Description *
                        </label>
                        <textarea
                            name="eventDescription"
                            value={eventData.eventDescription}
                            onChange={handleChange}
                            placeholder="Enter event description"
                            rows="5"
                            required
                            className="w-full mt-1 p-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 rounded-md placeholder-blue-400"
                        ></textarea>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>

                {message && (
                    <div className={`text-center mt-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateEvent;
