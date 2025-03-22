import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../redux/slices/auth.slice';
import { getSession, isValidToken } from '../auth/auth.utils';
import { Navigate } from 'react-router-dom';

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

// בקומפוננטת הראוטר או המשגיח על הניתוב
function AuthGuard({ children }) {
    const { isAuthenticated, isInitialized } = useSelector((state) => state.auth);

    // אם עדיין לא אותחל, הצג טעינה
    //   if (!isInitialized) {
    //     return <LoadingScreen />;
    //   }

    // אם אותחל אבל המשתמש לא מחובר, הפנה להתחברות
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // אם הכל בסדר, הצג את התוכן המוגן
    return children;
}