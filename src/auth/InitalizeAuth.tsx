import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../redux/slices/auth.slice';
import { getSession, isValidToken } from '../auth/auth.utils';

function AppInit() {
    const dispatch = useDispatch();

    useEffect(() => {
        // בודק אם יש משתמש מאוחסן ואם הטוקן שלו תקף
        const user = getSession();

        if (user && user.token && isValidToken(user.token)) {
            // אם יש משתמש עם טוקן תקף, אתחל את המצב כמחובר
            dispatch(initializeAuth(user));
        } else {
            // אם אין משתמש או שהטוקן לא תקף, אתחל את המצב כלא מחובר
            dispatch(initializeAuth(null));
        }
    }, [dispatch]);

    return null; // קומפוננטה זו לא מציגה UI, רק מבצעת את האתחול
}