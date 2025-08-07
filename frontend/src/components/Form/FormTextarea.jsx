import React from "react";

const FormTextarea = ({ label, name, value, onChange, placeholder }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered w-full h-[180px]"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormTextarea;
