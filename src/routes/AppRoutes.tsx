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

const AppRoutes: React.FC = () => {
    const { user, isAuthenticated } = useAppSelector(state => state.login);

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
            <Route path="/getDiets" element={<GetDiets showCreateFilters={false}/>} />

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