import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FullUser } from "../../types/user.type";
import { loginUserApi } from "../../api/auth.api";
import { setSession } from "../../auth/auth.utils";
import { loginUser } from "../../services/login.service";

interface LoginState {
    loading: boolean;
    error: string | null;
    shouldRegister: boolean;
}

const initialState: LoginState = {
    loading: false,
    error: null,
    shouldRegister: false,
};

// יצירת פעולה אסינכרונית להתחברות
export const login = createAsyncThunk<
    FullUser, // סוג הנתון שמוחזר במקרה של הצלחה
    { email: string; password: string }, // סוג הנתונים שהפעולה מקבלת
    { rejectValue: string } // סוג השגיאה במקרה של כישלון
    
>("login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await loginUser(email, password); // קריאה ל-API
        if (!response.token) {
            return rejectWithValue("שגיאה בהתחברות - לא התקבל טוקן");
        }
        setSession({ mail: response.email, token: response.token }); // שמירת הסשן
        return response; // מחזיר את המשתמש המחובר
    } catch (error) {
        return rejectWithValue(error.message || "שגיאה בהתחברות");
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.shouldRegister = false;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.shouldRegister = false;
            })
            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "שגיאה לא צפויה";
                state.shouldRegister = state.error.includes("משתמש לא קיים");
            });
    },
});

export const { clearError } = loginSlice.actions;
export default loginSlice.reducer;