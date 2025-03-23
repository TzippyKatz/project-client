import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../redux/slices/auth.slice';
import { AppDispatch, RootState } from '../redux/store';
// Remove the CSS import that's causing issues
// import './LoginPage.css';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
    
    // Add loading state which is referenced in the component
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Variable to store auth error
    const [authError, setAuthError] = useState('');

    // מקבל את המיקום המקורי מה-state, אם קיים
    const from = location.state?.from?.pathname || "/";

    // מעקב אחרי שינויים במצב ההתחברות
    useEffect(() => {
        if (user) {
            console.log('User logged in, redirecting to:', from);
            navigate(from, { replace: true });
        } else if (isAuthenticated) {
            console.log('User needs to register, redirecting to registration page');
            navigate('/register', { 
                state: { 
                    email,
                    from: location.state?.from 
                } 
            });
        }
    }, [user, isAuthenticated, navigate, from, email, location.state?.from]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setAuthError('');

        if (!email || !password) {
            setError('נא למלא את כל השדות');
            return;
        }

        try {
            setLoading(true);
            console.log('Submitting login form...');
            // Fix the login dispatch to match the expected type
            // Need to create a properly structured FullUser object
            await dispatch(login({
                email,
                token: '', // This will be set by the API response
                id: '',   // Add required properties from AuthUser
                firstName: '',
                lastName: '',
                userType: 'user',
                // Add any other required fields from FullUser type
            }));
            // Remove the unwrap() call
        } catch (err) {
            console.error('Login error:', err);
            setError('שגיאה בהתחברות. אנא נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>התחברות</h2>
                {(error || authError) && (
                    <div className="error-message">
                        {error || authError}
                        {isAuthenticated && (
                            <div className="register-link">
                                <Link to="/register" state={{ email, from: location.state?.from }}>
                                    לחץ כאן להרשמה
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">אימייל</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">סיסמה</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'מתחבר...' : 'התחבר'}
                    </button>
                </form>
                <div className="register-section">
                    <p>עדיין אין לך חשבון?</p>
                    <Link to="/register" state={{ from: location.state?.from }} className="register-button">
                        הרשם עכשיו
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;