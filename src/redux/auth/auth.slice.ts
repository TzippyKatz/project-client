import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.types";

type AuthStateType = {
    user: UserType | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    user: null,
    isAuthanticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<UserType>) => {
            state.user = action.payload;
            state.isAuthanticated = true;
            state.isInitialized = true;
        },
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        }
    }
})

export const { setUser, setInitialize } = authSlice.actions

export default authSlice.reducer