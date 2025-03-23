// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { login } from '../redux/slices/auth.slice';
// import { AppDispatch, RootState } from '../redux/store';
// import { getUserRoleBySession } from '../auth/auth.utils';
// import { Login } from '../components/auth/Login';
// import { unwrapResult } from "@reduxjs/toolkit";
// import { FullUser, loginUserType } from '../types/user.type';

import { Login } from "../components/auth/Login"

// const LoginPage: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { user, isAuthenticated } = useSelector((state: RootState) => state.login);

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const from = location.state?.from?.pathname || "/";

//     useEffect(() => {
//         if (isAuthenticated && user) {
//             const userRole = getUserRoleBySession(user.token);
//             handleNavigation(userRole);
//         }
//     }, [isAuthenticated, user]);

//     const handleLogin = async (email: string, password: string) => {
//         setError('');
//         setLoading(true);

//         try {
//             await dispatch(login({ email, password } as Partial<FullUser>)).unwrap();
//         } catch (err) {
//             setError('שגיאה בהתחברות. אנא נסה שוב.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleNavigation = (userRole: string) => {
//         switch (userRole) {
//             case "admin":
//                 navigate("/meal");
//                 break;
//             case "nutritionist":
//                 navigate("/diet");
//                 break;
//             case "user":
//                 navigate("/register");
//                 break;
//             default:
//                 navigate("/");
//         }
//     };

//     return (
//         <div className="login-page">
//             <Login onLogin={handleLogin} loading={loading} error={error} />
//             <div className="register-section">
//                 <p>עדיין אין לך חשבון?</p>
//                 <Link to="/register" state={{ from }}>
//                     הרשם עכשיו
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

const LoginPage = () => {

    return(
        <Login />
    )
}
export default LoginPage;