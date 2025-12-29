"use client";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import Container from "@/app/components/container";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { LogoutAction } from "@/app/(pages)/app/actions/auth";
import { ContextUser } from "@/app/providers/user-provider";

export default function Header() {
    const router = useRouter();
    const { user, setUser } = ContextUser();

    const profile = (name: string) => {
        const profileName = name.trim().split(/\s+/);
        if (profileName.length === 1) {
            return profileName?.[0]?.charAt(0).toUpperCase() || "";
        }

        return `${profileName?.[0]?.charAt(0).toUpperCase() || ""} ${
            profileName?.[1]?.charAt(0).toUpperCase() || ""
        }`;
    };

    const logOut = async () => {
        try {
            const data = await LogoutAction();
            setUser(null);
            console.log(data.message);
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <header className="w-full shadow-sm  inset-x-0 top-0 z-50 sticky bg-white">
            <Container className="h-16 flex items-center justify-between py-2 ">
                <Image
                    src="/logo-task-black-18x120.webp"
                    alt="logo"
                    width={80}
                    height={80}
                    className="-rotate-2 "
                />

                <div className="flex items-center justify-center gap-4 bg-gray-200/40 px-2 py-1 rounded-full">
                    <h1 className="text-xl text-center font-semibold text-black ml-2">
                        {profile(user?.name || "") || "acessar conta >"}
                    </h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-black flex items-center justify-center cursor-pointer  px-1 py-1 rounded-full hover:bg-gray-200/70 group">
                                <CiUser className="w-6 h-6  group-hover:text-neutral-800 " />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mt-3 " align="end">
                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                            {user && (
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Perfil
                                        <DropdownMenuShortcut>
                                            ⇧⌘P
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="cursor-pointer">
                                        Configurações
                                        <DropdownMenuShortcut>
                                            ⌘S
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            )}
                            <DropdownMenuSeparator />

                            {user ? (
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        logOut();
                                    }}
                                >
                                    Sair
                                    <DropdownMenuShortcut>
                                        <MdLogout />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => {
                                            router.push("/login");
                                        }}
                                    >
                                        Login
                                        <DropdownMenuShortcut>
                                            <MdLogout />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => {
                                            router.push("/signup");
                                        }}
                                    >
                                        Registrar
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Container>
        </header>
    );
}
