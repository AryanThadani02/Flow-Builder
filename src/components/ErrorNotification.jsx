import React from "react";
import "./ErrorNotification.css";

const ErrorNotification = ({ error, onClose }) => {
  if (!error) {
    return null;
  }

  const isSuccess = error.includes("✅");
  const notificationClass = isSuccess
    ? "success-notification"
    : "error-notification";
  const icon = isSuccess ? "✅" : "⚠️";

  return (
    <div className={notificationClass}>
      <div className="error-content">
        <span className="error-icon">{icon}</span>
        <span className="error-message">{error}</span>
        <button className="error-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;
