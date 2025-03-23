import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import PrivateRoute from '../components/auth/PrivateRoute'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { AddDiet } from '../components/diets/AddDiet'
import { GetDiets } from '../components/diets/GetDiets'
import { AuthState } from '../types/auth.types'
import SendEmail from '../components/email/SendEmail'
import AboutPage from '../pages/AboutPage'
import AdminDashboardPage from '../pages/AdminPage'


// הוספת קומפוננטה לשימוש עבור ניתוב על פי תפקיד
const RoleBasedRoute: React.FC<{
    children: React.ReactNode;
    allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
    const { user } = useSelector((state: RootState) => state.auth as AuthState);
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    if (!allowedRoles.includes(user.role)) {
        // אם למשתמש אין הרשאה, הפנה אותו לדף הבית או דף "אין הרשאה"
        return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth as AuthState);

    return (
        <Routes>
            {/* ניתובים ציבוריים */}
            <Route path="/" element={<HomePage />} />
            {/* ////////////////// */}
            <Route path="/mail" element={<SendEmail />} />
            {/* ////////////////// */}
            <Route path="/login" element={
                user ? <Navigate to="/" replace /> : <LoginPage />
            } />
            <Route path="/register" element={
                user ? <Navigate to="/" replace /> : <RegisterPage />
            } />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/user/:userId" element={<UserProfile />} /> */}

            {/* // ניתובים מאובטחים
            // <Route path="/profile" element={
            //     <PrivateRoute>
            //         <ProfilePage />
            //     </PrivateRoute>
            // } /> */}

             {/* דפי לוח בקרה לפי תפקיד */}
             {/* למנהל */}
             <Route path="/admin-dashboard" element={
                <RoleBasedRoute allowedRoles={['admin']}>
                    <AdminDashboardPage />
                </RoleBasedRoute>
            } />
            {/* לתזונאי-דיאטן */}
            <Route path="/manager-dashboard" element={
                <RoleBasedRoute allowedRoles={['nutritionist', 'admin']}>
                    {/* <MenagerDashboardPage /> */}
                </RoleBasedRoute>
            } />
            {/* למשתמש רשום */}
            <Route path="/user-dashboard" element={
                <RoleBasedRoute allowedRoles={['user', 'nutritionist', 'admin']}>
                    {/* < /> */}
                </RoleBasedRoute>
            } />


            <Route path="/diet" element={
                <PrivateRoute>
                    <AddDiet />
                </PrivateRoute>
            } />

            <Route path="/getDiet" element={
                <PrivateRoute>
                    <GetDiets showCreateFilters={true} />
                </PrivateRoute>
            } />

            {/* ניתוב ברירת מחדל - מפנה לדף הבית */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes; 