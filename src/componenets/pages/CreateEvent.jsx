import { useState } from 'react';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventImageUrl: '',
        eventDate: '',
        eventDay: '',
        eventDescription: '',
        location: '',
        time: '',
        presentedTime: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const daysOfWeek = [
        'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

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
            const response = await fetch('https://your-api-endpoint.com/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) throw new Error('Failed to create event');

            const result = await response.json();
            setMessage('✅ Event created successfully!');
            setEventData({
                eventName: '',
                eventImageUrl: '',
                eventDate: '',
                eventDay: '',
                eventDescription: '',
                location: '',
                time: '',
                presentedTime: ''
            });
        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to create event.');
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
                        <label className="block text-sm font-medium text-gray-700">Event Name *</label>
                        <input
                            type="text"
                            name="eventName"
                            value={eventData.eventName}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL *</label>
                        <input
                            type="url"
                            name="eventImageUrl"
                            value={eventData.eventImageUrl}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date *</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={eventData.eventDate}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Day *</label>
                        <select
                            name="eventDay"
                            value={eventData.eventDay}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        >
                            <option value="" disabled>Select Day</option>
                            {daysOfWeek.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Location *</label>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time *</label>
                        <input
                            type="text"
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            placeholder="e.g., 10:00 AM - 6:00 PM"
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Presented Time (optional)</label>
                        <select
                            name="presentedTime"
                            value={eventData.presentedTime}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md"
                        >
                            <option value="">-- Optional --</option>
                            {presentedTimeOptions.map((time, idx) => (
                                <option key={idx} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            name="eventDescription"
                            value={eventData.eventDescription}
                            onChange={handleChange}
                            rows="5"
                            required
                            className="w-full mt-1 p-2 border rounded-md"
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
