import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("endereço de email inválido"),
    password: z
        .string()
        .min(1, "Campo obrigatório")
        .min(6, "Mínimo 6 caracteres"),
    rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
