import { useState, useEffect } from "react";
import { updateUser, getUsersById } from "../../services/user.service";
import { foodType } from "../../types/food.type";
import axios from "axios";
import { userType } from "../../types/user.type";

export const UpdateUserPage = () => {
    const [formData, setFormData] = useState<userType>({
        id: 0,  // או ערך התחלתי אחר אם מתאים
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        file: null as File | null,
        favoriteFood: [] as Array<foodType>,
        weight: [] as number[],  // או ערך התחלתי אחר
        role: "",  // הערך התחלתי עבור role
        dietId: 0,  // אם מתאים
    });
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // שליפת המידע של המשתמש מ-localStorage
        const user = localStorage.getItem("user");

        if (user) {
            const userData = JSON.parse(user); // המידע נמצא בתוך ה- user
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
        
        // const updatedData = Object.fromEntries(
        //     Object.entries(formData).filter(([key, value]) => value !== "")
        // );

        try {
            console.log("Updating user", formData);
            await updateUser(formData);
            console.log("User updated successfully!");
            setSuccessMessage("User updated successfully!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data);
                console.error("Error status:", error.response?.status);
                setError(error.response?.data?.message || "Failed to update user");
            } else {
                console.error("Unexpected error:", error);
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Username:</label>
                <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="file">Profile Image:</label>
                <input type="file" id="file" name="file" onChange={handleFileChange} accept="image/*" /><br /><br />
                
                <input type="submit" value="Update" />
            </form>
            
            {error && <h1 style={{ color: "red" }}>{error}</h1>}
            {successMessage && <h1 style={{ color: "green" }}>{successMessage}</h1>}
        </div>
    );
};

export default UpdateUserPage;