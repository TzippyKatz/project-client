import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FullUser } from "../../types/user.type";
import { getSession, jwtDecode, setSession } from "../../auth/auth.utils";
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
    "login/request",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        const data = await loginUser({ email, password }); // כנראה שכבר JSON
        return data;
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
                const tokenString = getSession();
                if (tokenString != null) {
                    const token = tokenString.token;
                    console.log("getSession: " + token)
                    const decodedToken = jwtDecode(token);

                    const user: FullUser = {
                        id: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/Id"],
                        userName: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userName"],
                        email: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/email"],
                        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "user",
                        token: token,
                        password: "",
                        firstName: "",
                        lastName: "",
                        phone: "",
                        file: null,
                        favoriteFood: [],
                        weight: "" as any,
                        dietId: 0,
                        image: ""
                    };

                    setSession({ email: user.email, token: token });
                    state.user = user;
                    state.isAuthenticated = true;
                    state.loading = false;
                    state.error = null;
                }
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
            
                const errorMessage =
                    action.payload && typeof action.payload === "object" && "message" in action.payload
                        ? (action.payload as { message?: string }).message ?? "שגיאה כללית"
                        : "שגיאה כללית";
            
                state.error = errorMessage; // Now guaranteed to be a string
                state.shouldRegister = errorMessage.includes("משתמש לא קיים");
                state.isAuthenticated = false;
            });    
    }
});

export const { logout, clearError } = loginSlice.actions;
export default loginSlice.reducer;