import { ReactNode } from "react";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/slices/auth.selectors";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthenticated, isInitialized } = useAppSelector(selectAuth);
    const { pathname } = useLocation();
    
    if (!isInitialized) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to={'/login'} state={{ from: pathname }} />;
    }
    
    return <>{children}</>;
}