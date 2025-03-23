// src/redux/slices/auth.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from '../../types/auth.types';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

interface LoginPayload {
    token: string;
    user: AuthUser;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            const { token, user } = action.payload;
            // שמירת הטוקן ב-localStorage
            localStorage.setItem('token', token);
            
            state.isAuthenticated = true;
            state.user = user;
            state.loading = false;
            state.error = null;
        },
        logout(state) {
            // מחיקת הטוקן מה-localStorage
            localStorage.removeItem('token');
            
            state.isAuthenticated = false;
            state.user = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;