interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div
            className={`card p-6 border rounded-md shadow-sm bg-gray-200 ${className}`}
        >
            {children}
        </div>
    );
}
