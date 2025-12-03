import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

//mover para type
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputError?: boolean;
    error?: string;
    width?: string;
    className?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    name: string;
    rules?: RegisterOptions;
}

export default function Input({
    type,
    register,
    className,
    width,
    name,
    rules,
    inputError,
    ...props
}: InputProps) {
    return (
        <input
            {...register(name, rules)}
            type={type}
            {...props}
            className={`w-full p-2 border border-gray-500 rounded-md focus:outline-none 
                ${className || ""}`.trim()}
            style={{
                borderWidth: "1px",
                borderColor: inputError ? "red" : "",
            }}
        />
    );
}
