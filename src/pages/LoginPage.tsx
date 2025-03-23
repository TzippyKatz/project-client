// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../redux/store";
// import { loginRequest } from "../redux/slices/login.slice";
// import jwt_decode from "jwt-decode";
// import './LoginPage.css';
// import { Login } from "../components/auth/Login";

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     // השתמש ב-selector לקבלת מצב הטעינה והשגיאות מה-store
//     const { loading, error } = useAppSelector(state => state.login);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         console.log("Sending login request:", { email, password });

//         const resultAction = await dispatch(loginRequest({ email, password }));
//         console.log("Login response:", resultAction);
//         if (loginRequest.fulfilled.match(resultAction)) {
//             console.log("Login successful:", resultAction.payload);
//             const user = resultAction.payload;
//             if (user && user.role) {
//                 routeUserByRole(user.role);
//             } else {
//                 navigate('/');
//                 console.log("Login failed:", resultAction);
//             }
//         }
//     }

//         // פונקציה לניתוב המשתמש לפי תפקידו
//         const routeUserByRole = (role: string) => {
//             switch (role.toLowerCase()) {
//                 case 'admin':
//                     navigate('/admin-dashboard');
//                     break;
//                 case 'manager':
//                     navigate('/manager-dashboard');
//                     break;
//                 case 'user':
//                     navigate('/user-dashboard');
//                     break;
//                 default:
//                     navigate('/');
//             }
//         };

//         return (
//             <div className="login-container">
//                 {/* <h1>התחברות</h1>
//                 {error && <p className="error-message">{error}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="email">אימייל:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="form-group password-container">
//                         <label htmlFor="password">סיסמה:</label>
//                         <div className="password-input-container">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className="password-toggle"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         className="login-btn"
//                         disabled={loading}
//                     >
//                         {loading ? "מתחבר..." : "התחבר"}
//                     </button> */}
//                 {/* </form> */}
//                 <Login />
//             </div>
//         );
//     };

//     export default LoginPage;

import { useAppSelector } from "../redux/store";
import { Login } from "../components/auth/Login";
import './LoginPage.css';

const LoginPage = () => {
    // בדיקת סטטוס האימות מחנות Redux
    const { isAuthenticated } = useAppSelector(state => state.login);

    return (
        <div className="login-page">
            <Login />
        </div>
    );
};

export default LoginPage;
