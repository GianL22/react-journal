import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"
import { setActiveNote, startLoadingNotes } from "../store"

export const useCheckoAuth = () => {
    const {status} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
  
  useEffect(() => {onAuthStateChanged(FirebaseAuth, (user) => {
    if (!user) return dispatch(logout())
    const {uid, email, displayName, photoURL} = user
    dispatch(login({uid, email, displayName, photoURL}))
    dispatch(startLoadingNotes())
    dispatch(setActiveNote(null))
  })}, [])

  return status
}
