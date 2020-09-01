import { auth, User } from "firebase"

const provider = new auth.GoogleAuthProvider()

export const signIn = () => {
    console.log("auth service sign in")
    auth().useDeviceLanguage()
    auth().signInWithPopup(provider)
}

export const signOut = () => {
    console.log("auth service sign out")
    auth().signOut()
}

export const registerAuthChangedCallback = (callback: (user: User | null) => void) => {
    auth().onAuthStateChanged(callback)
}
