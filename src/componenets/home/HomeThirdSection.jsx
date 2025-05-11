import React, { useState, useEffect, useRef } from 'react';
import EventCard from './EventCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeThirdSection = () => {
    const [events, setEvents] = useState([]);
    const scrollRef = useRef(null);
    const animationRef = useRef(null);
    const [scrollSpeed, setScrollSpeed] = useState(0.5); // default speed
    const [scrollDirection, setScrollDirection] = useState(1); // 1 = left-to-right, -1 = right-to-left

    useEffect(() => {
        fetch('/cscEvents.json')
            .then((res) => res.json())
            .then((data) => {
                // Repeat events 5 times to simulate infinite scroll in both directions
                const repeatedEvents = Array(5).fill(data).flat();
                setEvents(repeatedEvents);

                // Wait until events are rendered before scrolling to center
                setTimeout(() => {
                    if (scrollRef.current) {
                        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
                    }
                }, 100);
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const scroll = () => {
            if (scrollContainer) {
                // Scroll position reset logic for infinite loop (both sides)
                if (scrollContainer.scrollLeft <= 0) {
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
                } else if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
                } else {
                    scrollContainer.scrollLeft += scrollSpeed * scrollDirection;
                }
            }
            animationRef.current = requestAnimationFrame(scroll);
        };

        animationRef.current = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationRef.current);
    }, [events, scrollSpeed, scrollDirection]);

    const scrollLeft = () => {
        setScrollSpeed((prevSpeed) => Math.min(prevSpeed + 0.5, 5));
        setScrollDirection(1); // scroll to the right
    };

    const scrollRight = () => {
        setScrollDirection(-1); // scroll to the left
    };

    return (
        <div className="container mx-auto px-4 relative">
            <h2 className="text-2xl font-bold mb-4 mt-6 text-center">Our Events</h2>

            {/* Left Arrow */}
            <button
                onClick={scrollLeft}
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
                <FaChevronLeft size={20} />
            </button>

            {/* Right Arrow */}
            <button
                onClick={scrollRight}
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
                <FaChevronRight size={20} />
            </button>

            {/* Event Slider */}
            <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-hidden scroll-smooth pb-4"
                style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
            >
                {events.map((event, index) => (
                    <div
                        key={`${event.eventDate}-${index}`}
                        className="flex-shrink-0 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%]"
                    >
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeThirdSection;
