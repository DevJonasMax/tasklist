"use client";
import { useForm } from "react-hook-form";
import {
    Field,
    FieldDescription,
    FieldSeparator,
    FieldLabel,
} from "../../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignUpForm } from "@/app/schemas/zoodSchema/signupSchema";
import { SignUpSchema } from "@/app/schemas/zoodSchema/signupSchema";
import Input from "../../input";
import Button from "../../button";
import Link from "next/link";
import { useState } from "react";
import { RegisterAction } from "@/app/(pages)/app/actions/auth";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useWatch } from "react-hook-form";
import router from "next/router";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
    });
    const name = useWatch({
        control,
        name: "name",
    });
    const email = useWatch({
        control,
        name: "email",
    });
    const password = useWatch({
        control,
        name: "password",
    });

    const resetIputs = () => {
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
    };

    const onSubmit = async (data: SignUpForm) => {
        console.log(data);
        try {
            await RegisterAction({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            resetIputs();
            router.push("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.status === 409) {
                setError("Email já esta em uso");
                return;
            }
            if (error instanceof Error) {
                setError(error.message);
                return;
            } else {
                console.error("Erro desconhecido. Por favor, tente novamente.");
                setError(
                    "Erro desconhecido. Por favor confira seus dados e tente novamente."
                );
                return;
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field className="w-full md:w-96 flex flex-col gap-2 items-center justify-center">
                <FieldLabel>Nome Completo</FieldLabel>
                <Input register={register} name="name" type="text" />
                {errors.name && (
                    <p className="text-red-400 text-sm">
                        *{errors.name.message} !
                    </p>
                )}
                <FieldLabel>Email</FieldLabel>
                <Input register={register} name="email" type="email" />
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
                <FieldLabel>Password</FieldLabel>
                <div className="relative w-full">
                    <Input
                        register={register}
                        name="password"
                        type={showPassword ? "text" : "password"}
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
                        *{errors.password.message} !
                    </p>
                ) : (
                    <FieldDescription className="text-sm text-gray-500">
                        Use pelo menos 6 caracteres, uma letra maiúscula, uma
                        letra minúscula, um número e um caractere especial.
                    </FieldDescription>
                )}
                <FieldSeparator />
                {error && <p className="text-red-400 text-sm">*{error} !</p>}
                <FieldSeparator />
                <Button disabled={!name || !email || !password} type="submit">
                    Inscrever-se
                </Button>
                <Link
                    href="/login"
                    className="text-sm text-gray-500 text-center mt-2 hover:underline hover:text-gray-400"
                >
                    Já tem uma conta? Faça login.
                </Link>
            </Field>
        </form>
    );
}
