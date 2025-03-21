import { useState } from "react";
import { loginUser } from "../services/login.service";
import { data, useNavigate } from "react-router-dom";
import { getSession, getUserRoleBySession } from "../auth/auth.utils";
import { Eye, EyeOff } from "lucide-react";

export const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginUserType = { email, password };

        try {
            console.log("trying login")
            const response = await loginUser(loginUserType);
            console.log(response);
        } catch (err) {
            setError("Failed to Login")
        } finally {
            console.log("Fiinally")
        }

        nextPage()
    };
    const nextPage = () => {

        const session = getSession();
        if (!session || !session.token) {
            console.log("No valid session found");
            return;
        }

        let userRole = getUserRoleBySession(session.token)

        switch (userRole) {
            case "admin":
                navigate("/meal");
                break;
            case "nutritionist":
                navigate("/register");
                // navigate("/diet");
                break;
            case "user":
                navigate("/register");
                break;
            default:
                navigate("/");
        }
    };

    const navigate = useNavigate()
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br /><br />

                <label htmlFor="password">Password:</label>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingRight: "30px" }} // מקום לאייקון
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
                
                    <button type="submit" onClick={handleSubmit}>התחבר</button>
            </form>

            {error && <h1>{error}</h1>}
        </div>
    );
};