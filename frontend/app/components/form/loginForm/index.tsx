"use client";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/app/schemas/zoodSchema/loginSchema";
import { LoginFormSchema } from "@/app/schemas/zoodSchema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/app/components/ui/field";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Link from "next/link";

import { useRouter } from "next/navigation";
import AuthAction from "@/app/(pages)/app/actions/auth";

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {

        try {
            const req = await AuthAction({
                email: data.email,
                password: data.password,
            });
            console.log(req.message);
            router.push("/app");
        } catch (err: any) {
            if (err?.status === 404) {
                console.log("Usuário não encontrado!");
            } else if (err?.status === 401) {
                console.log("Usuário ou senha inválidos!");
            } else {
                console.log(err.message);
            }
        };
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field className="w-full md:w-96 gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    register={register}
                    name="email"
                    inputError={!!errors.email?.message}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email ? (
                    <p className="text-red-400 text-sm">
                        *{errors.email.message} !
                    </p>
                ) : (
                    <FieldDescription className="text-sm text-gray-500">
                        Nunca compartilhar suas informações pessoais com
                        terceiros..
                    </FieldDescription>
                )}

                <FieldSeparator />
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    register={register}
                    name="password"
                    inputError={!!errors.password?.message}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password ? (
                    <p className="text-red-400 text-sm">
                        *{errors.password?.message} !
                    </p>
                ) : (
                    <FieldDescription className="text-sm text-gray-500">
                        Nunca compartilharemos sua senha com terceiros.
                    </FieldDescription>
                )}
                <FieldSeparator />
                {watch("email") && watch("password") && (
                    <FieldGroup className="flex flex-row items-center justify-start gap-2">
                        <FieldLabel
                            htmlFor="remember"
                            className="text-sm text-gray-500"
                        >
                            Remember me
                        </FieldLabel>
                        <input
                            id="remember"
                            type="checkbox"
                            {...register("rememberMe")}
                            className="w-4 h-4 border border-gray-500 rounded-md cursor-pointer"
                        />
                    </FieldGroup>
                )}
                <FieldSeparator />
                <Button
                    type="submit"
                    className="w-full p-2 border rounded-md bg-gray-500 text-white cursor-pointer hover:bg-gray-600"
                >
                    Login
                </Button>
                <Link
                    href="/signup"
                    className="text-sm text-gray-500 text-center mt-2 hover:underline hover:text-gray-400"
                >
                    Não tem uma conta? Inscreva-se.
                </Link>
            </Field>
        </form>
    );
}
