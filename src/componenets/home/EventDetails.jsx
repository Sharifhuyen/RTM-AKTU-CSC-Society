// EventDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = React.useState(null);

    React.useEffect(() => {
        fetch('https://rtm-aktu-csc-society-server-side.onrender.com/events')
            .then((res) => res.json())
            .then((data) => {
                const selectedEvent = data.find((e) => e._id === id);
                setEvent(selectedEvent);
            })
            .catch((error) => console.error('Error fetching event details:', error));
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }


    return (
        <div className="max-w-4xl mx-auto px-4 py-10 mt-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <img
                    className="w-full h-72 object-cover"
                    src={event.eventImageUrl}
                    alt={event.eventName}
                />
                <div className="p-8">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{event.eventName}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">{event.eventDescription}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>
                            <span className="font-semibold text-gray-700">📅 When:</span> {`${event.eventDay}, ${event.eventDate} at ${event.time}`}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">📍 Where:</span> {event.location}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EventDetails;
