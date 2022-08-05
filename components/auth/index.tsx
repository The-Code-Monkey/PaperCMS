import {signIn, useSession} from "next-auth/react";
import {ReactNode, useEffect} from "react";

interface Props {
    children: ReactNode;
}

const Auth = ({ children }: Props) => {
    const { data: session, status, ...rest } = useSession();

    useEffect(() => {
        console.log(session, status, rest)
        if (status === "unauthenticated") signIn()
    }, [session]);

    if (status !== "authenticated") return null;

    return <>
        {children}
    </>
}

export default Auth;