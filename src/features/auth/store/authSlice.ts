import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as authService from "api/auth.service"
import { User } from "firebase"
import { AppThunk, RootState } from "../../../app/store"

export interface AppUser {
    uid: string
    displayName: string | null
}

interface AuthState {
    user: AppUser | null
    ready: boolean
}

const initialState: AuthState = {
    user: null,
    ready: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthReady(state) {
            state.ready = true
        },
        setUser(state, { payload }: PayloadAction<AppUser | null>) {
            state.user = payload
        },
    },
})

export const { setUser, setAuthReady } = authSlice.actions
export default authSlice.reducer

export const watchAuth = (): AppThunk => (dispatch) => {
    authService.registerAuthChangedCallback((user: User | null) => {
        dispatch(setAuthReady())
        if (user) {
            const { uid, displayName } = user
            dispatch(setUser({ uid, displayName }))
        } else {
            dispatch(setUser(null))
        }
    })
}

export const signIn = () => {
    authService.signIn()
}

export const signOut = () => {
    authService.signOut()
}

export const selectReady = (state: RootState) => state.auth.ready
export const selectUser = (state: RootState) => state.auth.user
