import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from "../../redux/store";

interface Props {
    children: React.ReactNode;
    requiredRoles?: string[]; // רשימת תפקידים שיכולים לגשת (אופציונלי)
}

const PrivateRoute: React.FC<Props> = ({ children, requiredRoles }) => {
    // לקיחת מידע המשתמש מ-login slice
    const { user, isAuthenticated } = useAppSelector(state => state.login);

    // אם המשתמש לא מחובר, הפנייה לדף ההתחברות
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // אם יש דרישת תפקידים ספציפיים, בדוק אם למשתמש יש הרשאה
    if (requiredRoles && requiredRoles.length > 0) {
        const userRole = user.role.toLowerCase();
        if (!requiredRoles.includes(userRole)) {
            // אם למשתמש אין הרשאת גישה, הפנה אותו לדף הבית
            return <Navigate to="/" replace />;
        }
    }

    // אם המשתמש מחובר ויש לו הרשאה, הצג את התוכן המבוקש
    return <>{children}</>;
};

export default PrivateRoute;