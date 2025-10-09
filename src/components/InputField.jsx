import React from "react";

const InputField = ({ label, name, type, icon: Icon, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-3 
                     focus:border-[#007A8A] focus:ring-2 focus:ring-[#007A8A] focus:ring-opacity-50 
                     border shadow-sm placeholder:text-gray-400 text-gray-900 sm:text-sm"
          placeholder={label}
        />
      </div>
    </div>
  );
};

export default InputField;
