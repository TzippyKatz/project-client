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
        const authUser: AuthUser | null = getSession()
        if (authUser?.token && isValidToken(authUser.token)) {
            // בדיקה האם הטוקן שווה לנתוני היוזר
            dispatch(setUser(authUser.user))
            setAuthorizationHeader(authUser.token)
        }
        dispatch(setInitialize())
    }, [])

    return <>{children}</>
}