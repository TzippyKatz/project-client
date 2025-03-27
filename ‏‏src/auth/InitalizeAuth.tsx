import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../redux/slices/auth.slice';
import { getSession, isValidToken, jwtDecode } from '../auth/auth.utils';
import { getUserByEmail } from '../services/user.service';

function AppInit() {
    const dispatch = useDispatch();

    useEffect(() => {
        // בודק אם יש משתמש מאוחסן ואם הטוקן שלו תקף

        // if (user && user.token && isValidToken(user.token)) {
        let token = localStorage.getItem('user')
        const decodedToken = jwtDecode(token || "null")
        const email =  decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/email"]

        if (token) {
            getUserByEmail(email).then((fullUserData) => {
                if (fullUserData) {
                    dispatch(initializeAuth(fullUserData)); // אתחול עם הנתונים
                } else {
                    dispatch(initializeAuth(null)); // במקרה של שגיאה
                }
            });
        } else {
            dispatch(initializeAuth(null)); // אין טוקן
        }
    }, [dispatch]);

    return null; // קומפוננטה זו לא מציגה UI, רק מבצעת את האתחול
}