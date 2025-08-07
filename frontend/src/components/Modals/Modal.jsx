import React from "react";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-lg max-w-xl w-full relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
