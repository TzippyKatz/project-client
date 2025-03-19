import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../redux/store"
import { AuthUser } from "../types/user.type"
import { getSession, isValidToken, setAuthorizationHeader } from "./auth.utils"
import { setInitialize, setUser } from "../redux/auth/auth.slice"

type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();
    console.log("check")
    useEffect(() => {
        const authUser: AuthUser | null = getSession();

        if (authUser?.token && isValidToken(authUser.token)) {
            setAuthorizationHeader(authUser.token);
            dispatch(setUser(authUser.mail)); 
        }

    dispatch(setInitialize());
}, [dispatch]);

    return <>{ children }</>
}