import axios from "axios";
import { useState } from "react";
import { addUser } from "../../services/user.service";
import { foodType } from "../../types/food.type";
import { Eye, EyeOff } from "lucide-react";
import './Register.css'

export const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        image: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
        file: null as File | null,
        favoriteFood: [],
        weight: [-1.0],
        dietId: 0
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null });
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!formData.userName.trim()) newErrors.userName = "שם משתמש הוא שדה חובה";
        if (!formData.firstName.trim()) newErrors.firstName = "שם פרטי הוא שדה חובה";
        if (!formData.lastName.trim()) newErrors.lastName = "שם משפחה הוא שדה חובה";
        if (!formData.email.trim()) newErrors.email = "אימייל הוא שדה חובה";
        if (!formData.password.trim()) newErrors.password = "סיסמה היא שדה חובה";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);

        if (!validateForm()) return;

        try {
            console.log("Form Data:", formData);
            const response = await addUser(formData);
            console.log("Success:", response.data);
            setSuccessMessage("המשתמש נרשם בהצלחה!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };


    return (
        <div className="register-container">
            <h1>הרשמה</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="userName">שם משתמש:</label>
                <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} />
                {errors.userName && <span style={{ color: "red" }}>{errors.userName}</span>}

                <label htmlFor="firstName">שם פרטי:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}

                <label htmlFor="lastName">שם משפחה:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}

                <label htmlFor="email">אימייל:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

                <label htmlFor="password">סיסמה:</label>
                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}

                <label htmlFor="phone">טלפון:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

                <label htmlFor="file">תמונת פרופיל:</label>
                <input type="file" id="file" name="file" onChange={handleFileChange} accept="file/*" />

                <input type="submit" value="הירשם" style={{ color:"green" }} />
            </form >

            {successMessage && <h1 style={{ color: "green" }}>{successMessage}</h1>}
        </div >
    );
};