import SignUpForm from "../../components/form/signupForm";

import Container from "@/app/components/container";
import Card from "../../components/card";

export default function SignUp() {
    return (
        <Container className="h-screen flex items-center justify-center ">
            <Card className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-gray-500 ">
                    Inscreva-se
                </h1>
                <SignUpForm />
            </Card>
        </Container>
    );
}
