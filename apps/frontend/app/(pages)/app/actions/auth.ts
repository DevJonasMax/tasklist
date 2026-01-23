import { Api } from "@/app/lib/api";
import { LoginRequest, RegisterRequest } from "@/app/types/auth";

export async function AuthAction({ email, password }: LoginRequest) {
    try {
        const response = await Api.post("/auth/signin", {
            email: email.trim(),
            password: password.trim(),
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function RegisterAction({
    name,
    email,
    password,
}: RegisterRequest) {
    try {
        const response = await Api.post("/auth/signup", {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
        });
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}

export async function LogoutAction() {
    try {
        const response = await Api.post("/auth/signout");
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}
