"use client"

import { useState } from "react"
import { auth } from '@/configs/firebase'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa"

export default function Authentication({ children }) {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [tab, setTab] = useState("signin")
    const provider = new GoogleAuthProvider()

    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const user = result.user
            console.log("Google user:", user)
            setOpen(false)
        } catch (error) {
            console.error("Google sign-in error:", error)
        }
    }

    const handleEmailSignIn = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log("Email sign-in user:", userCredential.user)
            resetForm()
            setOpen(false)
        } catch (error) {
            console.error("Email sign-in error:", error)
        }
    }

    const handleEmailSignUp = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log("New user signed up:", userCredential.user)
            resetForm()
            setOpen(false)
        } catch (error) {
            console.error("Email sign-up error:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Welcome</DialogTitle>
                    <DialogDescription className="text-md text-center">
                        Sign in or create a new account to continue.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={tab} onValueChange={setTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    {/* Sign In */}
                    <TabsContent value="signin">
                        <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaEnvelope />
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                        <FaLock />
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                </div>
                            <Button type="submit" className="w-full bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 hover:bg-gradient-to-b transition duration-300">
                                Sign in with Email
                            </Button>
                        </form>

                        <div className="text-center text-sm text-muted-foreground py-3">or</div>

                        <DialogFooter>
                            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                                <FaGoogle />
                                Sign in with Google
                            </Button>
                        </DialogFooter>
                    </TabsContent>

                    {/* Sign Up */}
                    <TabsContent value="signup">
                        <form onSubmit={handleEmailSignUp} className="space-y-4">
                        <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaEnvelope />
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                        <FaLock />
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                </div>
                            <Button type="submit" className="w-full bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 hover:bg-gradient-to-b transition duration-300">
                                Create Account
                            </Button>
                        </form>

                        <div className="text-center text-sm text-muted-foreground py-3">or</div>

                        <DialogFooter>
                            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                                <FaGoogle />
                                Sign up with Google
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
