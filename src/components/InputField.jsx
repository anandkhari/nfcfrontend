import React from 'react';

/**
 * A reusable input field component with icon support.
 *
 * @param {string} label - The label text displayed above the input.
 * @param {string} name - The input's name and ID.
 * @param {string} type - The input type (e.g., text, email, password).
 * @param {React.Component} icon - The Lucide icon component to display.
 * @param {string} value - The input's value.
 * @param {Function} onChange - The change handler function.
 */
const InputField = ({ label, name, type, icon: Icon, value, onChange }) => {
  return (
    <div>
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-brand-gray"
      >
        {label}
      </label>

      {/* Input with Icon */}
      <div className="relative mt-1">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-brand-gray" aria-hidden="true" />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          className="block w-full rounded-2xl border border-gray-300 py-3 pl-10 pr-4 shadow-sm focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/50"
        />
      </div>
    </div>
  );
};

export default InputField;
