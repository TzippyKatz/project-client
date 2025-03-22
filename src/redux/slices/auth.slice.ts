import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/user.type";
import { setSession, removeSession } from "../../auth/auth.utils";

type AuthStateType = {
    user: AuthUser | null,
    isAuthenticated: boolean, // תיקון שגיאת כתיב
    isInitialized: boolean
}

const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // שים לב שהשיניתי להעברת אובייקט משתמש מלא
        login: (state, action: PayloadAction<AuthUser>) => {
            setSession(action.payload); // השתמש ב-utils להגדרת הסשן
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        logout: (state) => {
            removeSession(); // השתמש ב-utils להסרת הסשן
            state.user = null;
            state.isAuthenticated = false;
        },
        initializeAuth: (state, action: PayloadAction<AuthUser | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isInitialized = true;
        }
    }
})

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;