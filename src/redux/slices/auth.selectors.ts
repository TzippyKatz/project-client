import { RootState } from "../store";
import { AuthState } from '../../types/auth.types';

export const selectAuth = (state: RootState): AuthState => state.auth;

// export const selectAuth = (state: RootState) => state.auth

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;