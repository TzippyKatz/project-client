import { ReactNode } from "react";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/slices/auth.selectors";
import { Navigate, useLocation } from "react-router-dom";
import PATHS from "./../routes/paths";
import { AuthState } from "../types/auth.types"; // יבא את הטיפוס שהגדרנו

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth);
    const { pathname } = useLocation();
    
    if (!isInitialized) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthanticated) {
        return <Navigate to={PATHS.login} state={{ from: pathname }} />;
    }
    
    return <>{children}</>;
}