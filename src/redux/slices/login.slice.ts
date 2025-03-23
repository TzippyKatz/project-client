import { createSlice, createAsyncThunk, PayloadAction, unwrapResult } from "@reduxjs/toolkit";
import { FullUser, loginUserType } from "../../types/user.type";
import { setSession } from "../../auth/auth.utils";
import { loginUser } from "../../services/login.service";

interface LoginState {
    user: FullUser;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    shouldRegister: boolean;
}

const initialState: LoginState = {
    user: null as any,
    isAuthenticated: false,
    loading: false,
    error: null,
    shouldRegister: false
};

// יצירת פעולה אסינכרונית להתחברות
export const login = createAsyncThunk<
    FullUser, // סוג הנתון שמוחזר במקרה של הצלחה
    { email: string; password: string }, // סוג הנתונים שהפעולה מקבלת
    { rejectValue: string } >
    ("login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await loginUser({email, password}); 
        if (!response.token) {
            return rejectWithValue("שגיאה בהתחברות - לא התקבל טוקן");
        }
        setSession({ mail: response.email, token: response.token }); // שמירת הסשן
        return response; // מחזיר את המשתמש המחובר
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("שגיאה בהתחברות");
    }    
});
// export const login = createAsyncThunk<FullUser, UserLoginType>(
//     "auth/login",
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const response = await loginUser(email, password);
//             return response.data; // חייב להחזיר את כל השדות ש-FullUser מצפה להם
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


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