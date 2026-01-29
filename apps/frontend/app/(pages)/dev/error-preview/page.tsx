"use client";

import { useEffect } from "react";

export default function ErrorPreview() {
    useEffect(() => {
        throw Error("Preview do erro 500");
    }, []);

    return <div className="flex items-center justify-center min-h-screen">Gerando erro de teste...</div>;
}
