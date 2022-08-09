import {signIn, useSession} from "next-auth/react";
import {ReactNode, useEffect} from "react";

interface Props {
    children: ReactNode;
}

const Auth = ({ children }: Props) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") signIn()
    }, [status]);

    if (status !== "authenticated") return null;

    return <>
        {children}
    </>
}

export default Auth;