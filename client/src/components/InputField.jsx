import React from "react";

export const InputField = ({
    name,
    title,
    placeholder,
    onChange,
    value,
    type,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label>{title}</label>
            <input
                name={name}
                onChange={onChange}
                value={value}
                type={type ?? "text"}
                className="border py-3 rounded-lg px-3 ring-0 ring-indigo-500 focus:ring-1 outline-none"
                placeholder={placeholder}
            />
        </div>
    );
};
