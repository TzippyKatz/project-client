import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import PrivateRoute from '../components/auth/PrivateRoute'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { AddDiet } from '../components/diets/AddDiet'
import { GetDiets } from '../components/diets/GetDiets'
import SendEmail from '../components/email/SendEmail'
import AboutPage from '../pages/AboutPage'
import { GetUsers } from '../components/user/GetUsers'
import { UpdateUser } from '../components/user/UpdateProfile'
import { foodType } from '../types/food.type'

const AppRoutes: React.FC = () => {
    const { user, isAuthenticated } = useAppSelector(state => state.login);
    const userdefault = {
        id: 0,
        userName: "",
        firstName: "",
        lastName: "",
        image: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
        file: null as File | null,
        favoriteFood: [],
        weight: [-1.0],
        dietId: 0
    }
    return (
        <Routes>
            {/* ניתובים ציבוריים */}
            <Route path="/" element={<HomePage />} />

            <Route path="/mail" element={<SendEmail />} />

            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            } />
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
            } />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/getDiets" element={<GetDiets showCreateFilters={true} />} />
            <Route path="/getUsers" element={<GetUsers />} />

            <UpdateUser showRole={false} user={null} />

            {/* דפי לוח בקרה לפי תפקיד */}
            {/* <Route path="/admin-dashboard" element={
                <PrivateRoute requiredRoles={['admin']}>
                    <AdminDashboardPage />
                </PrivateRoute>
            } />

            <Route path="/manager-dashboard" element={
                <PrivateRoute requiredRoles={['nutritionist', 'admin']}>
                    <ManagerDashboardPage />
                </PrivateRoute>
            } /> */}

            {/* <Route path="/user-dashboard" element={
                <PrivateRoute requiredRoles={['user', 'manager', 'admin']}>
                    <UserDashboard />
                </PrivateRoute>
            } /> */}

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