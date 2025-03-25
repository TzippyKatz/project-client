// import { useState, useEffect } from "react";
// import { getUserById, updateUser } from "../../services/user.service";
// import { foodType } from "../../types/food.type";
// import axios from "axios";
// import { userType } from "../../types/user.type";
// import "./UpdateProfile.css"; // חיבור לקובץ ה-CSS
// import { jwtDecode } from "../../auth/auth.utils";
// import { Eye, EyeOff } from "lucide-react";


// interface UpdateUserProps {
//     user: userType;
// }

// export const UpdateUser: React.FC<UpdateUserProps> = ({ user }) => {

//     const [formData, setFormData] = useState<userType>({
//         id: 0,
//         userName: "",
//         firstName: "",
//         lastName: "",
//         image: "",
//         email: "",
//         password: "",
//         role: "",
//         phone: "",
//         file: null as File | null,
//         favoriteFood: [],
//         weight: [-1.0],
//         dietId: 0
//     });
//     const [error, setError] = useState<string>("");
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//         const fetchUser = async () => {
//             const user = localStorage.getItem("user");
//             if (user) {
//                 const userData = JSON.parse(user);
//                 const decodedToken = jwtDecode(userData.token);
//                 const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
//                 const user1 = await getUserById(userId)
//                 await setFormData((prev) => ({ ...prev, ...user1 }))
//             } else {
//                 console.error("User not found in storage");
//             }
//         }
//         fetchUser()
//     }, []);

//     useEffect(() => {
//         console.log("Updated formData:", formData);
//     }, [formData]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             console.log("Updating user", formData);
//             // const { id, ...userData } = formData;
//             // console.log("formData: " + formData)
//             await updateUser(formData);
//             setSuccessMessage("הנתונים עודכנו בהצלחה");
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 setError(error.response?.data?.message || "Failed to update user");
//             } else {
//                 setError("An unknown error occurred");
//             }
//         }
//     };

//     return (
//         <div className="register-container">
//             <h1>עדכון משתמש</h1>
//             <form onSubmit={handleSubmit} className="register-form">
//                 <label htmlFor="userName">שם משתמש:</label>
//                 <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />

//                 <label htmlFor="firstName">שם פרטי:</label>
//                 <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

//                 <label htmlFor="lastName">שם משפחה:</label>
//                 <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

//                 <label htmlFor="email">מייל:</label>
//                 <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

//                 <label htmlFor="role">תפקיד:</label>
//                 <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} required />

//                 <label htmlFor="password">סיסמה:</label>
//                 <div className="password-container">
//                     <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required />
//                     <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} >
//                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                 </div>

//                 <label htmlFor="phone">פלאפון:</label>
//                 <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

//                 <label htmlFor="file">תמונת פרופיל:</label>
//                 <input type="file" id="file" name="file" onChange={handleFileChange} accept="image/*" />

//                 <input type="submit" value="עדכון" className="register-button" />
//             </form>

//             {error && <p className="error-message">{error}</p>}
//             {successMessage && <p className="success-message">{successMessage}</p>}
//         </div>
//     );
// };

import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../services/user.service";
import axios from "axios";
import { userType } from "../../types/user.type";
import "./UpdateProfile.css";
import { jwtDecode } from "../../auth/auth.utils";
import { Eye, EyeOff } from "lucide-react";


export const UpdateUser: React.FC<{ showRole: boolean; user: userType | null }> = ({ showRole, user }) => {
    // export const UpdateUser: React.FC<{ showRole: boolean }> = ({ showRole }) => {
    const [formData, setFormData] = useState<userType>({
        id: 0,
        userName: "",
        firstName: "",
        lastName: "",
        image: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        file: null as File | null,
        favoriteFood: [],
        weight: "",
        dietId: 0
    });
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (user) { 
                setFormData((prev) => ({ ...prev, ...user }));
            } else {
                const userStorage = localStorage.getItem("user");
                if (userStorage) {
                    try {
                        const userData = JSON.parse(userStorage);
                        const decodedToken = jwtDecode(userData.token);
                        const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                        const user1 = await getUserById(userId);
                        setFormData((prev) => ({ ...prev, ...user1 }));
                    } catch (error) {
                        console.error("Failed to parse user from storage", error);
                    }
                } else {
                    console.error("User not found in storage");
                }
            }
        };
        fetchUser();
    }, [user]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            setSuccessMessage("הנתונים עודכנו בהצלחה");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Failed to update user");
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="updateUser-container">
            <h1>עדכון משתמש</h1>
            <form onSubmit={handleSubmit} className="updateUser-form">
                {!showRole && (
                    <>
                        <label htmlFor="userName">שם משתמש:</label>
                        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />

                        <label htmlFor="firstName">שם פרטי:</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

                        <label htmlFor="lastName">שם משפחה:</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

                        <label htmlFor="email">מייל:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled />

                        <label htmlFor="password">סיסמה:</label>
                        <div className="password-container">
                            <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required />
                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <label htmlFor="phone">פלאפון:</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

                        <label htmlFor="file">תמונת פרופיל:</label>
                        <input type="file" id="file" name="file" onChange={handleFileChange} accept="image/*" />
                    </>
                )}
                {showRole && (
                    <>
                        <label htmlFor="role">תפקיד:</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="nutritionist">Nutritionist</option>
                        </select><br /><br />
                    </>
                )}
                <input type="submit" value="עדכון" className="updateUser-button" />
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};