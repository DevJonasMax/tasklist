import Header from "@/app/components/header";
import Container from "@/app/components/container";
import { UserProvider } from "@/app/providers/user-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <UserProvider>
                <Header />
                <Container>{children}</Container>
                <ToastContainer />
            </UserProvider>
        </>
    );
}
