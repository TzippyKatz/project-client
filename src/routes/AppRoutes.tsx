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


const AppRoutes: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            {/* ניתובים ציבוריים */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={
                user ? <Navigate to="/" replace /> : <LoginPage />
            } />
            <Route path="/register" element={
                user ? <Navigate to="/" replace /> : <RegisterPage />
            } />
            {/* <Route path="/user/:userId" element={<UserProfile />} /> */}

            {/* // ניתובים מאובטחים
            // <Route path="/profile" element={
            //     <PrivateRoute>
            //         <ProfilePage />
            //     </PrivateRoute>
            // } /> */}

            <Route path="/diet" element={
                <PrivateRoute>
                    <AddDiet />
                </PrivateRoute>
            } />

            <Route path="/getDiet" element={
                <PrivateRoute>
                    <GetDiets />
                </PrivateRoute>
            } />

            {/* ניתוב ברירת מחדל - מפנה לדף הבית */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes; 