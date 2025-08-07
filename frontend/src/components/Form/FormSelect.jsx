import React from "react";

const FormSelect = ({ label, name, list = [], placeholder, value, defaultValue, onChange }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <select
        className="select select-bordered"
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {placeholder || `Pilih ${label}`}
        </option>
        {list && list.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
