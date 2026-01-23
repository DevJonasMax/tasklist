"use client";
import { useForm } from "react-hook-form";
import {
    Field,
    FieldDescription,
    FieldSeparator,
    FieldLabel,
} from "../../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type SignUpForm,
    SignUpSchema,
} from "@/app/schemas/zoodSchema/signupSchema";

import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Link from "next/link";

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = async (data: SignUpForm) => {
        console.log(data);
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
                <Input register={register} name="password" type="password" />
                {errors.password ? (
                    <p className="text-red-400 text-sm">
                        *{errors.password.message} !
                    </p>
                ) : (
                    <FieldDescription className="text-sm text-gray-500">
                        Use pelo menos 8 caracteres, uma letra maiúscula, uma
                        letra minúscula, um número e um caractere especial.
                    </FieldDescription>
                )}
                <FieldSeparator />
                <Button>Inscrever-se</Button>
                <Link
                    href="/login"
                    className="text-sm text-gray-500 text-center mt-2"
                >
                    Já tem uma conta? Faça login.
                </Link>
            </Field>
        </form>
    );
}
