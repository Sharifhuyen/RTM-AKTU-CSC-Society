// EventList.jsx
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { format } from 'date-fns';

const EventsDisplay = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isUpcoming, setIsUpcoming] = useState(true);

    useEffect(() => {
        fetch('/cscEvents.json')
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data.filter((event) => new Date(event.eventDate) > new Date()));
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    const handleFilterChange = (filterType) => {
        setIsUpcoming(filterType === 'upcoming');
        const filtered = events.filter((event) => {
            return filterType === 'upcoming'
                ? new Date(event.eventDate) > new Date()
                : new Date(event.eventDate) < new Date();
        });
        setFilteredEvents(filtered);
    };

    return (
        <div className="container mx-auto px-4 mt-6">
            <div className="flex justify-center items-center py-4">
                <button
                    onClick={() => handleFilterChange('upcoming')}
                    className={`px-4 mx-2 py-2 rounded-lg ${isUpcoming ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Upcoming Events
                </button>
                <button
                    onClick={() => handleFilterChange('past')}
                    className={`px-4 py-2  mx-2 rounded-lg ${!isUpcoming ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Past Events
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-scroll pb-4">
                {filteredEvents.map((event) => (
                    <EventCard key={event.eventDate} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsDisplay;
