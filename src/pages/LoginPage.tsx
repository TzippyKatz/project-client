// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { login } from '../redux/slices/authSlice';
// import { AppDispatch, RootState } from '../store/store';
// import './LoginPage.css';

// const LoginPage: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { currentUser, loading, error: authError, shouldRegister } = useSelector((state: RootState) => state.auth);
    
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     // מקבל את המיקום המקורי מה-state, אם קיים
//     const from = location.state?.from?.pathname || "/";

//     // מעקב אחרי שינויים במצב ההתחברות
//     useEffect(() => {
//         if (currentUser) {
//             console.log('User logged in, redirecting to:', from);
//             navigate(from, { replace: true });
//         } else if (shouldRegister) {
//             console.log('User needs to register, redirecting to registration page');
//             navigate('/register', { 
//                 state: { 
//                     email,
//                     from: location.state?.from 
//                 } 
//             });
//         }
//     }, [currentUser, shouldRegister, navigate, from, email, location.state?.from]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         if (!email || !password) {
//             setError('נא למלא את כל השדות');
//             return;
//         }

//         try {
//             console.log('Submitting login form...');
//             const result = await dispatch(login({ email, password })).unwrap();
//             console.log('Login result:', result);
//         } catch (err) {
//             console.error('Login error:', err);
//             setError('שגיאה בהתחברות. אנא נסה שוב.');
//         }
//     };

//     return (
//         <div className="login-page">
//             <div className="login-container">
//                 <h2>התחברות</h2>
//                 {(error || authError) && (
//                     <div className="error-message">
//                         {error || authError}
//                         {shouldRegister && (
//                             <div className="register-link">
//                                 <Link to="/register" state={{ email, from: location.state?.from }}>
//                                     לחץ כאן להרשמה
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="email">אימייל</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             disabled={loading}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">סיסמה</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             disabled={loading}
//                         />
//                     </div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'מתחבר...' : 'התחבר'}
//                     </button>
//                 </form>
//                 <div className="register-section">
//                     <p>עדיין אין לך חשבון?</p>
//                     <Link to="/register" state={{ from: location.state?.from }} className="register-button">
//                         הרשם עכשיו
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
