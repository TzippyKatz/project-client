import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth.slice"; // יש להוסיף את הפעולה המתאימה מהסלייס
import { AppDispatch } from "../../redux/store";
import jwt_decode from "jwt-decode";

interface LoginProps {
    onLogin?: (email: string, password: string) => void;
    loading?: boolean;
    error?: string | null;
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin, loading = false, error = null }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(error);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        
        try {
            // אם יש פונקציית onLogin חיצונית, השתמש בה
            if (onLogin) {
                onLogin(email, password);
                return;
            }
            
            // אם לא, בצע את תהליך ההתחברות כאן
            const response = await fetch('YOUR_API_ENDPOINT/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'התחברות נכשלה');
            }
            
            const data = await response.json();
            const token = data.token;
            
            // פענוח הטוקן לקבלת מידע על המשתמש
            const decodedToken: any = jwt_decode(token);
            
            // שמירת המידע ב-Redux
            dispatch(login({ 
                token,
                user: {
                    id: decodedToken.userId,
                    userName: decodedToken.userName,
                    email: decodedToken.email,
                    role: decodedToken.role, // תפקיד המשתמש מהטוקן
                    // מידע נוסף שקיים בטוקן...
                }
            }));
            
            // ניתוב לפי תפקיד
            routeUserByRole(decodedToken.role);
            
        } catch (err: any) {
            setLoginError(err.message || 'התחברות נכשלה');
            console.error('Login error:', err);
        }
    };
    
    // פונקציה לניתוב המשתמש לפי תפקידו
    const routeUserByRole = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                navigate('/admin-dashboard');
                break;
            case 'manager':
                navigate('/manager-dashboard');
                break;
            case 'user':
                navigate('/user-dashboard');
                break;
            default:
                // במקרה של תפקיד לא מוכר, נתב לדף הבית
                navigate('/');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />

                <label htmlFor="password">Password:</label>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: "30px" }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "5px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "מתחבר..." : "התחבר"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage