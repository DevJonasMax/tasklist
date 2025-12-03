import Container from "@/app/components/container";
import Card from "../../components/card";
import LoginForm from "../../components/form/loginForm";
import Image from "next/image";

export default function Login() {
    return (
        <Container className="h-screen flex items-center justify-center">
            <Card className=" flex flex-col items-center justify-center blur-[0.5px]">
                <div className="w-full  mb-8 flex flex-col items-center justify-center gap-2 p-2">
                    <Image
                        src="/logo-task-black-18x120.webp"
                        alt="logo-task"
                        width={120}
                        height={120}
                        priority
                        style={{
                            objectFit: "cover",
                            // border: "1px solid #000",
                        }}
                    />
                    <h1 className="text-3xl font-bold ">Login</h1>
                </div>
                <hr className="w-full border-t-2 border-gray-500/20 mb-6 " />
                <div className="w-full flex flex-col items-center justify-start">
                    <LoginForm />
                </div>
            </Card>
        </Container>
    );
}
