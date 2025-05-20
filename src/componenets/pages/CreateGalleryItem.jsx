import { useState } from 'react';

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

    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
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
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Gallery Item</h2>

            {showAlert && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
                    <p className="font-semibold">Description must be more than 220 characters.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Title *</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Big Data Analytics Workshop"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            name="description"
                            placeholder="Description must be more than 220 characters"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md min-h-[120px]"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Image URL *</label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md"
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Event">Event</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Resource">Resource</option>
                            <option value="Program">Program</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? 'Uploading...' : 'Upload Item'}
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

export default CreateGalleryItem;
