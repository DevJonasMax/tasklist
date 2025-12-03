import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button";
}

export default function Button({
    children,
    className,
    type = "submit",
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`w-full p-2 border rounded-md bg-gray-500 text-white cursor-pointer hover:bg-gray-600 ${className}`}
        >
            {children}
        </button>
    );
}
