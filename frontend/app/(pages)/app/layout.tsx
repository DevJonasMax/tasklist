import Header from "@/app/components/header";
import Container from "@/app/components/container";
import { UserProvider } from "@/app/providers/user-provider";



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
            </UserProvider>
        </>
    );
}
