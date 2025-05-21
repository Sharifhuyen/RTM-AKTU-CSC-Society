import { useState, useEffect } from 'react';
import {
    HiOutlinePencilSquare,
    HiOutlineDocumentText,
    HiOutlineLink,
    HiOutlineTag
} from 'react-icons/hi2';

const CreateGalleryItem = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        category: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false);
        setMessage('');

        if (formData.description.length <= 220) {
            setShowAlert(true);
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                uploadedBy: "Sharif Ahmed Huyen",
                dateUploaded: getCurrentDate(),
                createdAt: new Date().toISOString()
            };

            const response = await fetch('http://localhost:5000/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Upload failed');

            setMessage('✅ Image gallery item uploaded successfully!');
            setFormData({
                title: '',
                description: '',
                imageUrl: '',
                category: ''
            });
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to upload gallery item.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Gallery Item</h2>

            {showAlert && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-xl mb-5 shadow-sm">
                    <p className="font-semibold">⚠️ Description must be more than 220 characters.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 space-y-6">

                {/* Title */}
                <div>
                    <label className="flex items-center gap-2 text-blue-700 font-bold mb-1 text-sm">
                        <HiOutlinePencilSquare className="text-blue-700 text-lg" />
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Big Data Analytics Workshop"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="flex items-center gap-2 text-blue-700 font-bold mb-1 text-sm">
                        <HiOutlineDocumentText className="text-blue-700 text-lg" />
                        Description *
                    </label>
                    <textarea
                        name="description"
                        placeholder="Description must be more than 220 characters"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-blue-700 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="flex items-center gap-2 text-blue-700 font-bold mb-1 text-sm">
                        <HiOutlineLink className="text-blue-700 text-lg" />
                        Image URL *
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="flex items-center gap-2 text-blue-700 font-bold mb-1 text-sm">
                        <HiOutlineTag className="text-blue-700 text-lg" />
                        Category *
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-blue-700 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Event">Event</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Resource">Resource</option>
                        <option value="Program">Program</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
                >
                    {loading ? 'Uploading...' : 'Upload Item'}
                </button>
            </form>

            {/* Toast Message */}
            {message && (
                <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all duration-300 ${message.includes('✅') ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default CreateGalleryItem;
