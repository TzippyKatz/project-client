import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FullUser } from "../../types/user.type";
import { jwtDecode, setSession } from "../../auth/auth.utils";
import { loginUser } from "../../services/login.service"; // פונקציה ששולחת בקשה לשרת

interface LoginState {
    user: FullUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    shouldRegister: boolean;
}

const initialState: LoginState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    shouldRegister: false
};

// יצירת async thunk לביצוע התחברות
export const loginRequest = createAsyncThunk(
    "login/loginRequest",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUser({ email, password }); // קריאה לשרת
            return response; // מחזיר את הנתונים שיתקבלו ל-reducer
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            state.user = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginRequest.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                const decodedToken = jwtDecode(action.payload.token);
                const user: FullUser = {
                    ...decodedToken,
                    id: decodedToken.userId,
                    userName: decodedToken.userName,
                    email: decodedToken.email,
                    role: decodedToken.role || "user"
                };
                setSession({ email: user.email, token: action.payload.token });
                state.user = user;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.shouldRegister = (action.payload as string).includes("משתמש לא קיים");
                state.isAuthenticated = false;
            });
    }
});

export const { logout, clearError } = loginSlice.actions;
export default loginSlice.reducer;