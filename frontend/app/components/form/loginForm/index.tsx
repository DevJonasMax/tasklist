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
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { AuthAction } from "@/app/(pages)/app/actions/auth";
import { useState } from "react";
import { useWatch } from "react-hook-form";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            rememberMe: false,
        },
    });
    const email = useWatch({
        control,
        name: "email",
    });
    const password = useWatch({
        control,
        name: "password",
    });
    const onSubmit = async (data: LoginFormData) => {
        setError("");
        try {
            const req = await AuthAction({
                email: data.email,
                password: data.password,
            });
            console.log(req.message);
            router.push("/app");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err?.status === 404) {
                setError("Usuário não encontrado!");
            } else if (err?.status === 401) {
                setError("Usuário ou senha inválidos!");
            } else {
                console.log(err.message);
            }
        }
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
                    inputError={!!errors.email?.message || !!error}
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
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        register={register}
                        name="password"
                        inputError={!!errors.password?.message || !!error}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? (
                            <LiaEyeSolid className="w-5 h-5 text-gray-500" />
                        ) : (
                            <LiaEyeSlashSolid className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </div>
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
                {email && password && (
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
                {error && <p className="text-red-400 text-sm">*{error} !</p>}
                <FieldSeparator />
                <Button disabled={!email || !password} type="submit">
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
