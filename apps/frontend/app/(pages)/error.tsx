"use client";

import { MdRefresh } from "react-icons/md";
import Image from "next/image";

export default function Error({
    error,
    reset,
}: {
    error: Error & { status?: number };
    reset: () => void;
}) {
    return (
        <div className="w-full h-screen p-10 flex flex-col items-center justify-center">
            <Image
                src="/error-robot-01.webp"
                alt="Erro"
                priority
                width={400}
                height={400}
                className="w-84 h-64 mb-4"
            />
            <h1 className="text-6xl font-bold text-red-700">
                Erro {error.status ?? 500}
            </h1>

            <p className="mt-2 text-gray-500">
                {error.message || "Erro interno do servidor"}
            </p>

            <button onClick={reset} className="mt-4 underline cursor-pointer">
                <MdRefresh className="inline-block mr-2" />
                Tentar novamente
            </button>
        </div>
    );
}
