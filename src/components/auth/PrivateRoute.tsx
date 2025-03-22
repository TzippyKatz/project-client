import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { user } = useSelector((state: RootState) => state.auth);


    if (!user) {
        // אם המשתמש לא מחובר, מפנה אותו לדף ההתחברות
        return <Navigate to="/login" replace />;
    }

    // אם המשתמש מחובר, מציג את תוכן הדף המבוקש
    return <>{children}</>;
};

export default PrivateRoute; 