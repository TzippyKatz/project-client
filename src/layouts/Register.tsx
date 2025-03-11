import axios from "axios";
import { useState } from "react";
import { addUser } from "../services/user.service";
import { foodType } from "../types/food.type";

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role:"user",
        phone: "",
        file: null as File | null,
        favoriteFood: [],
        weight: [0],
        dietId: 0
    });
    const [error, setError] = useState<string>("");
    // const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.file) {
          formData.file = null;  // הפוך את זה ל-null אם אין קובץ
        }
  
        // try {
        //     console.log("Trying to register");
        //     const response = await addUser(formData);
        //     console.log(response);
        //     console.log("המשתמש נוסף בהצלחה");
        //     setSuccessMessage("User registered successfully!");
        // } catch (err: unknown) {
        //     if (err instanceof Error) {
        //         console.log(err)
        //         setError(err.message || "Failed to Register");
        //     } else {
        //         setError("An unknown error occurred");
        //     }
        try {
            console.log("Form Data:", formData);
            const response = await addUser(formData);
            console.log("Success:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data); // מה השרת מחזיר
                console.error("Error status:", error.response?.status); // קוד השגיאה
            } else {
                console.error("Unexpected error:", error);
            }        
        } finally{
            console.log("FINALLY REACHED!");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Username:</label>
                <input 
                    type="text" 
                    id="userName" 
                    name="userName"
                    value={formData.userName} 
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password} 
                    onChange={handleChange} 
                    required
                /><br /><br />
               
                <label htmlFor="phone">Phone:</label>
                <input 
                    type="text" 
                    id="phone" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleChange} 
                    required
                /><br /><br />

                <label htmlFor="file">Profile Image:</label>
                <input 
                    type="file" 
                    id="file" 
                    name="file"
                    onChange={handleFileChange} 
                    accept="file/*"
                /><br /><br />
                
                <input type="submit" value="Register" />
            </form>
            
            {error && <h1 style={{ color: "red" }}>{error}</h1>}
            {successMessage && <h1 style={{ color: "green" }}>{successMessage}</h1>}
        </div>
    );
};