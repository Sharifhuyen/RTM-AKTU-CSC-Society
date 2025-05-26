const FloatingAlert = ({ message, onClose }) => {
    return (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
            <p>{message}</p>
            <button onClick={onClose} className="ml-4 underline">
                Close
            </button>
        </div>
    );
};

export default FloatingAlert;
