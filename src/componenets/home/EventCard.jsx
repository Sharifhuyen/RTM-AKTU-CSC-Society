// EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const { eventImageUrl, eventName, eventDay, eventDate } = event;

    return (
        <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden mx-4 my-6">
            <img className="w-full h-48 object-cover" src={eventImageUrl} alt={eventName} />
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 break-words whitespace-normal">
                    {eventName}
                </h2>
                <p className="text-gray-500 text-sm">{`${eventDay}, ${eventDate}`}</p>
                <div className="mt-4">
                    <Link

                        to={`/event/${eventName}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default EventCard;
