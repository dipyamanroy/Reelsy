import { signOut } from "firebase/auth"
import { auth } from "@/configs/firebase"

export const handleSignOut = async () => {
    try {
        await signOut(auth)
        console.log("User signed out")
    } catch (error) {
        console.error("Sign-out error:", error)
    }
}
