import { useState, useEffect } from "react";
import { updateUser } from "../../services/user.service";
import { foodType } from "../../types/food.type";
import axios from "axios";
import { userType } from "../../types/user.type";
import "./UpdateProfile.css"; // חיבור לקובץ ה-CSS

interface UpdateUserProps {
    user: userType;
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ user }) => {
    const [formData, setFormData] = useState<userType>({
        id: 0,
        userName: "",
        firstName: "",
        lastName: "",
        image: "",
        email: "",
        password: "",
        phone: "",
        file: null as File | null,
        favoriteFood: [] as Array<foodType>,
        weight: [] as number[],
        role: "",
        dietId: 0,
    });
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const userData = JSON.parse(user);
            setFormData((prev) => ({ ...prev, ...userData }));
        } else {
            console.error("User not found in storage");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Updating user", formData);
            await updateUser(formData);
            setSuccessMessage("User updated successfully!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Failed to update user");
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="register-container">
            <h1>Update User</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="userName">Username:</label>
                <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />

                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <div className="password-container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

                <label htmlFor="file">Profile Image:</label>
                <input type="file" id="file" name="file" onChange={handleFileChange} accept="image/*" />

                <input type="submit" value="Update" className="register-button" />
            </form>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};