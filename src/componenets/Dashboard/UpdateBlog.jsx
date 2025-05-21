import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const UpdateBlog = ({ blog, onClose, onUpdateSuccess }) => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState(blog.title);
    const [authorName, setAuthorName] = useState(blog.authorName);
    const [tag, setTag] = useState(blog.tag);
    const [imageURL, setImageURL] = useState(blog.imageURL || "");
    const [content, setContent] = useState(blog.content || "");
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const countWords = (html) => {
        const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        return text ? text.split(" ").length : 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const wordCount = countWords(content);

        if (!title || !authorName || !tag || !content) {
            setErrorMessage("All fields are required.");
            setShowAlert(true);
            return;
        }

        if (wordCount < 100) {
            setErrorMessage("Blog content must be at least 100 words.");
            setShowAlert(true);
            return;
        }

        try {
            const updatedBlog = {
                title,
                imageURL,
                content,
                tag,
                updatedAt: new Date().toISOString(),
            };

            const response = await fetch(`http://localhost:5000/blog/${blog._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlog),
            });

            if (!response.ok) {
                throw new Error("Failed to update blog");
            }

            const result = await response.json();

            // ✅ Notify parent to rerender or refresh blog list
            if (typeof onUpdateSuccess === "function") {
                onUpdateSuccess(result); // Pass updated blog data if needed
            }

            // ✅ Close modal or form after success
            if (typeof onClose === "function") {
                onClose();
            }
        } catch (error) {
            console.error("Update error:", error);
            setErrorMessage("An error occurred while updating the blog.");
            setShowAlert(true);
        }
    };


    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <div className="max-h-[80vh] overflow-y-auto pr-2">
            {showAlert && (
                <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Update Blog</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tag / Category</label>
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content</label>
                    <Editor
                        apiKey="1lae18f58y1u574pz4i3r1m8g2kh11i17axcqr24l1ftr31q"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={blog.content} // Only from original props
                        value={content} // Controlled mode
                        onEditorChange={handleEditorChange}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",
                            branding: false,
                        }}
                    />

                    <p className="text-xs text-gray-500 mt-1">Minimum 100 words required.</p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
