import React from "react";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
