import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginProps {
    onLogin: (email: string, password: string) => void;
    loading: boolean;
    error: string | null;
}

// export const Login: React.FC<LoginProps> = ({ onLogin, loading, error }) => {
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onLogin(email, password);
    };

    return (
        <div>
            <h1>Login</h1>
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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

                {/* <button type="submit" disabled={loading}> */}
                    {/* {loading ? "מתחבר..." : "התחבר"} */}
                {/* </button> */}
            </form>
        </div>
    );
};
