import { AuthUser } from "../types/auth.types"
import axios from "../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userType } from "../types/user.type";
import { json } from "stream/consumers";

export const setSession = (user: AuthUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
}

export const setAuthorizationHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const getSession = (): AuthUser | null => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user
}

// export const getUserRoleBySession = (token: string): string | undefined => {
export const getUserRoleBySession = (token: string): string => {
    let decodedToken = jwtDecode(token);
    decodedToken = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return decodedToken;
};

export const removeSession = () => {
    localStorage.removeItem('user');
    axios.defaults.headers.common.Authorization = undefined;
    window.location.href = '/login';
}

export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}


export const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};


// פונקציה לשחזור הסשן
export const restoreSession = createAsyncThunk(
    'auth/restoreSession',
    async (token: string, { rejectWithValue }) => {
        try {
            const decodedToken = jwtDecode(token);
            if (!decodedToken) {
                localStorage.removeItem('token');
                return rejectWithValue('Invalid token');
            }

            // הגדרת הטוקן בהדר הגלובלי של axios
            //המזהה משתמש שלי לפי מייל
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userId = parseInt(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/email"]);

            // יצירת אובייקט משתמש מהנתונים המוצפנים בטוקן
            const user: userType = {
                id: userId,
                password: '', // הסיסמה לא מגיעה מהטוקן
                role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || '',
                userName: '', // אין מידע בטוקן, נשאר ריק
                firstName: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/firstName"]?.split(' ')[0] || '',
                lastName: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/lastName"]?.split(' ')[1] || '',
                email: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/email"] || '',
                phone: '', // אין מידע בטוקן
                file: null, // אין מידע בטוקן
                favoriteFood: [], // אין מידע בטוקן
                weight: [], // אין מידע בטוקן
                dietId: 0 // אין מידע בטוקן
            };

            // ניסיון לשלוף את פרטי המשתמש המלאים מהשרת
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/User/${userId}`);

                if (userResponse.data) {
                    const userData = userResponse.data;

                    // עדכון נתונים נוספים אם קיימים בשרת
                    Object.assign(user, {
                        ...userData,
                        favoriteFood: userData.favoriteFood || [],
                        weight: userData.weight || [],
                        dietId: userData.dietId ?? 0
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                // במקרה של שגיאה, נשארים עם הנתונים הבסיסיים מהטוקן
            }

            console.log('Restored user from token:', user);

            return {
                token,
                user
            };
        } catch (error) {
            console.error('Failed to restore session:', error);
            localStorage.removeItem('token');
            return rejectWithValue('Failed to restore session');
        }
    }
);