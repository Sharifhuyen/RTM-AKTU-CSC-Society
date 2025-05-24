import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";

export default function ImageGallery() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch("https://rtm-aktu-csc-society-server-side.onrender.com/galleries")
            .then((res) => res.json())
            .then((data) => {
                setImages(data);
                setFilteredImages(data);
            });
    }, []);

    const categories = ["All", ...new Set(images.map((item) => item.category))];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter((item) => item.category === category));
        }
    };

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
                RTM-AKTU CSC Society Image Gallery
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredImages.map((item) => (
                    <motion.div
                        key={item.sl}
                        layout
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform"
                        onClick={() => setSelectedImage(item)}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold truncate mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 truncate">{item.category}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Dialog
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-red-500 text-xl sm:text-2xl z-10 bg-red-50 rounded-full p-1"
                        >
                            <HiX />
                        </button>
                        {selectedImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={selectedImage.imageUrl}
                                    alt={selectedImage.title}
                                    className="w-full max-h-60 sm:max-h-80 md:max-h-96 object-contain"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                                    <p className="text-gray-700 mb-2">{selectedImage.description}</p>
                                    <div className="text-sm text-gray-500">
                                        <span>Category: {selectedImage.category}</span>
                                        <br />
                                        <span>Uploaded By: {selectedImage.uploadedBy}</span>
                                        <br />
                                        <span>Date: {selectedImage.createdAt}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
