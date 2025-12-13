import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
}

export default function Button({
    children,
    className,
    type = "submit",
    disabled = false,
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            type={type}
            className={`w-full p-2 border rounded-md ${className}${disabled ? " cursor-not-allowed bg-gray-400 text-gray-300" : " bg-gray-500 hover:bg-gray-600 text-white cursor-pointer "}`}
        >
            {children}
        </button>
    );
}
