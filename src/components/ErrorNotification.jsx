import React from "react";

const ErrorNotification = ({ error, onClose }) => {
  if (!error) {
    return null;
  }

  const isSuccess = error.includes("✅");
  const bgColor = isSuccess ? "bg-green-500" : "bg-red-500";
  const icon = isSuccess ? "✅" : "⚠️";

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg max-w-md`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="flex-1">{error}</span>
        <button
          className="text-white hover:text-gray-200 transition-colors"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;
