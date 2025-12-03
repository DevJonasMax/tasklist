import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

Api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.code === "ERR_NETWORK") {
            return Promise.reject(new Error("Sem conexão com o servidor."));
        }

        if (error.response) {
            const message = error.response.data?.message || error.response.data?.error || "Erro no servidor.";
            const status = error.response.status;
            const err = new Error(message) as Error & { status?: number };
            err.status = status;
            return Promise.reject(err);
        }

        return Promise.reject(new Error("Erro desconhecido."));
    }
);
