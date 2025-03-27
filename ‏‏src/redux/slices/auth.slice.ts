import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullUser } from '../../types/user.type'

// טיפוס עבור ה- state
interface AuthState {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: FullUser | null;
    loading: boolean;
    error: string | null;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        initializeAuth: (state, action: PayloadAction<FullUser | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        loginSuccess: (state, action: PayloadAction<FullUser>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string | null>) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload; // עכשיו זה מתאים ל- string | null
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;