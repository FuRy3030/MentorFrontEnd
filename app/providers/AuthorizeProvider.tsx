import { useSnapshot } from "valtio";
import AuthState from "../store/auth/AuthState";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface AuthorizeProviderProps {
    children: React.ReactNode;
}

function AuthorizeProvider(Props: AuthorizeProviderProps) {
    const IsUserLogged = useSnapshot(AuthState).IsLogged;
    const Router = useRouter();

    useEffect(() => {
        if (IsUserLogged && Router.route.startsWith('/auth')) {
            Router.push('/');
        } else if (!IsUserLogged && !Router.route.startsWith('/auth')) {
            Router.push('/auth/login');
        }
    }, [IsUserLogged]);

    return <>{Props.children}</>;
};

export default AuthorizeProvider;