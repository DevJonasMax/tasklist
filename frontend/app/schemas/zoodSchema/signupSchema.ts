import { z } from "zod";

export const SignUpSchema = z.object({
    name: z
        .string()
        .nonempty("Campo obrigatório")
        .min(3, "Mínimo 5 caracteres"),
    email: z.string().email("Email inválido").nonempty("Campo obrigatório"),
    password: z
        .string()
        .min(1, "Campo obrigatório")
        .min(6, "Mínimo 6 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Mínimo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial"
        ),
});

export type SignUpForm = z.infer<typeof SignUpSchema>;
