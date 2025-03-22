// auth.selectors.ts – מכיל פונקציות selector שמאפשרות לרכיבים לגשת למידע מהסטייט, כמו selectAuth, שמחזירה את הסטייט של המשתמש.
// auth.selectors.ts = שליפת נתונים מהסטייט 🔍

import { RootState } from "../store";
import { AuthState } from '../../types/auth.types';

export const selectAuth = (state: RootState): AuthState => state.auth;