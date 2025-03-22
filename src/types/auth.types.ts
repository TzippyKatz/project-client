export interface AuthState {
    isAuthanticated: boolean;
    isInitialized: boolean;
    user: any; // אפשר להחליף ב-User מוגדר יותר ספציפי
}  