// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link } from "react-router-dom";
// import './Login.css';

// export const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//     };

//     return (
//         <div className="login-container">
//             <h1>התחברות</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="email">אימייל:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />

//                 <div className="password-container">
//                 <label htmlFor="password">סיסמה:</label>
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button
//                         type="button"
//                         className="password-toggle"
//                         onClick={() => setShowPassword(!showPassword)}
//                     >
//                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                 </div>

//                 <button type="submit" className="login-btn">התחבר</button>
//                 {/* <Link to="/forgot-password" className="forgot-password">שכחת סיסמה?</Link> */}
//             </form>
//         </div>
//     );
// };


import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loginRequest } from "../../redux/slices/login.slice";
import "./Login.css";
import { getUserRoleBySession } from "../../auth/auth.utils";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    // קבלת מצב הטעינה והשגיאות מחנות Redux
    const { loading, error } = useAppSelector(state => state.login);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log("שולח בקשת התחברות:", { email, password });
        
        const resultAction = await dispatch(loginRequest({ email, password }));
        
        if (loginRequest.fulfilled.match(resultAction)) {
            console.log("התחברות הצליחה:", resultAction.payload);
            const user = resultAction.payload;
            if (user && getUserRoleBySession(user)) {
                console.log("role: " + user.role)
                console.log("role: " + getUserRoleBySession(user))
                routeUserByRole(getUserRoleBySession(user));
            } else {
                navigate('/');
            }
        }
    };
    
    // פונקציה לניתוב המשתמש לפי תפקיד
    const routeUserByRole = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                navigate('/admin');
                break;
            case 'nutritionist':
                navigate('/nutri');
                break;
            case 'user':
                navigate('/getDiets ');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <div className="login-container">
            <h1>התחברות</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">אימייל:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="password-container">
                    <label htmlFor="password">סיסמה:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button 
                    type="submit" 
                    className="login-btn"
                    disabled={loading}
                >
                    {loading ? "מתחבר..." : "התחבר"}
                </button>
                {/* <Link to="/forgot-password" className="forgot-password">שכחת סיסמה?</Link> */}
            </form>
        </div>
    );
};