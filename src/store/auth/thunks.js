import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const resp = await signInWithGoogle()
        if (resp.ok) return dispatch(login(resp))
        dispatch(logout(resp.errorMessage))
    }
}
export const startRegisterUserWithEmailPassword = ({email,name,password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const resp = await registerUserWithEmailPassword({email,name,password})
        if (resp.ok) return dispatch(login(resp))
        dispatch(logout(resp.errorMessage))
    }
}
export const startLoginUserWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const resp = await loginUserWithEmailPassword({email, password})
        if (resp.ok) return dispatch(login(resp))
        dispatch (logout(resp.errorMessage))
    } 
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()
        dispatch(logout(null))
    }
} 