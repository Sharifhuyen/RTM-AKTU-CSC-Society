import { useState, useEffect } from "react";
import Slide01 from "../../assets/HomeSlider/slide01.jpeg";
import Slide02 from "../../assets/HomeSlider/slide02.jpg";
import Slide03 from "../../assets/HomeSlider/slide03.jpg";
import Slide04 from "../../assets/HomeSlider/slide04.jpg";
import Slide05 from "../../assets/HomeSlider/slide05.jpg";

const images = [Slide01, Slide02, Slide03, Slide04, Slide05];

const HomeFirstSection = () => {
  const [current, setCurrent] = useState(0);

  // Next slide function
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="w-full mt-6 py-10 px-4 md:px-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[28rem]">
        {/* Left Part - Card */}
        <div className="bg-white shadow-md p-8 rounded-md flex flex-col justify-center h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your RTM-AKTU CSE Socitey</h2>

          <div className="leading-tight mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">We Break</h1>
            <h1 className="text-4xl md:text-5xl font-bold text-pink-600">The Ordinary</h1>
          </div>

          <p className="text-gray-600 mb-6">
            We aim to cultivate excellence and inclusivity within the CS community by
            advancing society to unprecedented levels of achievement.
          </p>

          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition w-max">
            Join Us
          </button>
        </div>

        {/* Right Part - Image Slider */}
        <div className="relative h-full flex items-center">
          <div className="overflow-hidden rounded-md shadow-md w-full h-full">
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover transition duration-500"
            />
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeFirstSection;
