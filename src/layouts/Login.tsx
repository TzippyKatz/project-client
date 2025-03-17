import { useState } from "react";
import { loginUser } from "../services/login.service";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    
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
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                /><br /><br />

                {/* <button type="submit" >התחבר</button> */}
                <button type="submit" onClick={() => navigate("/diet")}>התחבר</button>
            </form>
            
            {error && <h1>{error}</h1>}
        </div>
    );
};