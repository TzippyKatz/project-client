import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authrReducer from './auth/auth.slice'

export const store = configureStore({
    reducer: {
        auth: authrReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
    Promise<ReturnType> | ReturnType,
    RootState,
    unknown,
    UnknownAction
>