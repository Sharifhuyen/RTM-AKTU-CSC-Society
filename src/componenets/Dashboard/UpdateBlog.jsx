import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    FaHeading,
    FaImage,
    FaPen,
    FaCheckCircle,
    FaTimesCircle,
    FaTags,
} from "react-icons/fa";

const FloatingAlert = ({ type, message }) => {
    if (!message) return null;
    const base = "fixed top-4 right-4 z-50 flex items-center p-4 rounded shadow-md text-white";
    const color = type === "success" ? "bg-green-600" : "bg-red-600";

    return (
        <div className={`${base} ${color}`}>
            {type === "success" ? <FaCheckCircle className="mr-2 text-xl" /> : <FaTimesCircle className="mr-2 text-xl" />}
            <span>{message}</span>
        </div>
    );
};

const WarningModal = ({ onContinue, onCancel }) => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Important Formatting Notice</h2>
            <p className="text-gray-700 mb-4">
                Please paste content from <strong>Microsoft Word</strong> or <strong>Google Docs</strong> only.
            </p>
            <div className="flex justify-end gap-3">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={onContinue} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Continue</button>
            </div>
        </div>
    </div>
);

const UpdateBlog = ({ blogId, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(initialData?.imageUrl || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [tag, setTag] = useState(initialData?.tag || "");
    const [tags, setTags] = useState([]);
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [showEditor, setShowEditor] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [hasConfirmed, setHasConfirmed] = useState(true); // Assume true for editing

    useEffect(() => {
        fetch("/api/tags")
            .then((res) => res.json())
            .then((data) => setTags(data))
            .catch(() => showAlert("error", "Failed to load tags."));
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const textOnly = doc.body.textContent || "";
        const wordCount = textOnly.trim().split(/\s+/).filter(Boolean).length;

        if (!title.trim() || !tag || textOnly.trim().length === 0) {
            showAlert("error", "Title, tag, and content are required.");
            return;
        }

        if (wordCount < 300) {
            showAlert("error", "Content must be at least 300 words.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("tag", tag);
            if (image) formData.append("image", image);

            const response = await fetch(`/api/blogs/${blogId}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to update blog.");
            showAlert("success", "Blog updated successfully!");
        } catch (err) {
            showAlert("error", err.message || "Update failed.");
        }
    };

    const handleModalCancel = () => {
        setShowModal(false);
        setShowEditor(false);
    };

    const handleModalContinue = () => {
        setHasConfirmed(true);
        setShowEditor(true);
        setShowModal(false);
    };

    return (
        <>
            <FloatingAlert type={alert.type} message={alert.message} />
            {showModal && <WarningModal onContinue={handleModalContinue} onCancel={handleModalCancel} />}

            <div className="max-w-4xl mx-auto mt-12 mb-8 bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-3">
                    <FaPen className="text-blue-500" />
                    Update Blog Post
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                            <FaHeading className="text-blue-600" />
                            Blog Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                            <FaTags className="text-blue-600" />
                            Blog Tag
                        </label>
                        <select
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a tag</option>
                            {tags.map((t) => (
                                <option key={t._id} value={t._id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                            <FaImage className="text-blue-600" />
                            Replace Image (optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2 cursor-pointer"
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="mt-3 w-64 rounded shadow border"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-blue-600">Blog Content</label>
                        {showEditor ? (
                            <Editor
                                apiKey="1lae18f58y1u574pz4i3r1m8g2kh11i17axcqr24l1ftr31q"
                                value={content}
                                onEditorChange={(newContent) => setContent(newContent)}
                                init={{
                                    height: 400,
                                    menubar: false,
                                    plugins: ["lists", "paste"],
                                    toolbar: "undo redo | bold italic underline | bullist numlist | removeformat",
                                    paste_as_text: false,
                                    content_style: "body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }",
                                }}
                            />
                        ) : (
                            <div
                                onClick={() => setShowModal(true)}
                                className="w-full h-[200px] border-2 border-dashed border-blue-400 rounded flex items-center justify-center text-gray-500 cursor-pointer"
                            >
                                Click here to load editor...
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateBlog;
