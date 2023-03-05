import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider()

export const  signInWithGoogle = async () => {
    try{
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const {displayName, uid, email, photoURL} = result.user 

        return {
            ok : true,
            displayName,
            uid,
            email,
            photoURL
        }

    }catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok : false,
            errorMessage, 
        }
    }
}


export const registerUserWithEmailPassword = async ({name, email, password}) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = resp.user
        await updateProfile(FirebaseAuth.currentUser, {displayName : name})
        return {
            ok : true,
            displayName : name,
            uid,
            email,
            photoURL 
        }

    } catch (error) {

        console.log(error)
        return {
            ok : false,
            errorMessage : error.message,
        }
    }

}

export const loginUserWithEmailPassword = async ({email, password}) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password) 
        const {displayName, photoURL, uid} = resp.user
        return {
            ok: true,
            displayName,
            email,
            photoURL, 
            uid,
        }

    }catch (error){
        console.log(error)
        return {
            ok: false,
            errorMessage : error.message,
        }
    }
}

export const logoutFirebase = async () => {
    await FirebaseAuth.signOut()
}