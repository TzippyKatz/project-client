// auth.slice.ts – מנהל את הסטייט של המשתמש ומכיל פעולות (reducers) כמו login, logout, ו-initializeAuth.
// auth.slice.ts = ניהול הסטייט ועדכונו 🔄


import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser, AuthState } from "../../types/auth.types";
import { setSession, removeSession } from "../../auth/auth.utils";

const initialState: AuthState = {
    user: null,
    isAuthenticated: false, // תיקון שגיאת הכתיב
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            setSession(action.payload);
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        logout: (state) => {
            removeSession();
            state.user = null;
            state.isAuthenticated = false;
        },
        initializeAuth: (state, action: PayloadAction<AuthState | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isInitialized = true;
        }
    }
})

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;