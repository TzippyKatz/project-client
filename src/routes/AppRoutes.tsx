import React, { useEffect } from 'react'
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
import { jwtDecode } from '../auth/auth.utils'
import { getUserById } from '../services/user.service'
import { UserProfile } from '../components/user/UserProfile'
import { AddMeal } from '../components/meals/AddMeal'
import { MealPage } from '../pages/MealPage'

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
        weight: "",
        dietId: 0
    }

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const userString = localStorage.getItem("user");
    //             if (userString) {
    //                 const userData = JSON.parse(userString);  // כעת אין סכנה ל-JSON.parse(null)
    //             }
    //             const decodedToken = jwtDecode(userData.token);
    //             const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    //             const user1 = await getUserById(userId);
    //         } catch (error) {
    //             console.error("Error fetching users:", error);
    //         }
    //     }
    //     fetchUser()
    // }, [])


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
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/addDiet" element={<AddDiet />} />
            {/* <Route path="/addMeal" element={<AddMeal />} /> */}
            <Route path="/meal" element={<MealPage />} />

            {/* <UpdateUser showRole={false} user={null} /> */}
            {/* החלפתי בגלל שזה לא נתן JSX בתןך Route */}

            <Route path="/update-user" element={<UpdateUser showRole={false} user={null} />} />
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