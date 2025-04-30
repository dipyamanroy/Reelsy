"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/configs/firebase";
import { FaEnvelope, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { toast } from "sonner";

function AuthModal({ children }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        signin: false,
        signup: false,
        google: false,
        reset: false,
    });
    const [tabValue, setTabValue] = useState("signin");
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        setLoading({ signin: false, signup: true, google: false, reset: false });
        setError("");
        try {
            const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
            await updateProfile(res.user, {
                displayName: form.name,
                photoURL: "https://www.gravatar.com/avatar/?d=mp",
            });
            setOpen(false);
            toast.success("User created successfully! Switching to Sign In tab.");
            setTabValue("signin");  // Switch to Sign In tab
        } catch (err) {
            setError(err.message);
            toast.error("Error creating account. Please try again.");
        } finally {
            setLoading({ signin: false, signup: false, google: false, reset: false });
        }
    };

    const handleSignIn = async () => {
        setLoading({ signin: true, signup: false, google: false, reset: false });
        setError("");
        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            setOpen(false);
            toast.success("Signed in successfully!");
        } catch (err) {
            setError(err.message);
            toast.error("Error signing in. Please check your credentials.");
        } finally {
            setLoading({ signin: false, signup: false, google: false, reset: false });
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading({ signin: false, signup: false, google: true, reset: false });
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setOpen(false);
            toast.success("Signed in with Google!");
        } catch (err) {
            setError(err.message);
            toast.error("Error signing in with Google.");
        } finally {
            setLoading({ signin: false, signup: false, google: false, reset: false });
        }
    };

    const handleForgotPassword = async () => {
        setLoading({ signin: false, signup: false, google: false, reset: true });
        setError("");
        try {
            await sendPasswordResetEmail(auth, form.email);
            setForgotPassword(false); // Close modal after password reset
            toast.success("Password reset email sent successfully!");
        } catch (err) {
            setError(err.message);
            toast.error("Error sending password reset email.");
        } finally {
            setLoading({ signin: false, signup: false, google: false, reset: false });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <div className="text-center">
                        <DialogTitle className="text-2xl mt-3">Welcome to Reelsy</DialogTitle>
                        <DialogTitle className="text-sm font-normal text-neutral-300 m-2">
                            {forgotPassword ? "Reset your password" : "Sign in or Create an Account to continue"}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {forgotPassword ? (
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                <FaEnvelope />
                            </div>
                            <Input
                                placeholder="Email"
                                name="email"
                                onChange={handleInputChange}
                                value={form.email}
                                className="pl-10"
                            />
                        </div>
                        <Button
                            onClick={handleForgotPassword}
                            className="bg-gradient-to-br w-full from-green-400 to-blue-500 text-gray-900 hover:bg-gradient-to-b transition duration-300"
                            disabled={loading.reset}
                        >
                            {loading.reset ? <Loader2 className="animate-spin" /> : "Send Reset Email"}
                        </Button>
                        <Button
                            onClick={() => setForgotPassword(false)}
                            variant="link"
                            className="w-full text-gray-400"
                        >
                            Back to Sign In
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                ) : (
                    <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin">
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaEnvelope />
                                    </div>
                                    <Input
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleInputChange}
                                        value={form.email}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaLock />
                                    </div>
                                    <Input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        onChange={handleInputChange}
                                        value={form.password}
                                        className="pl-10"
                                    />
                                </div>
                                <Button
                                    onClick={handleSignIn}
                                    className="bg-gradient-to-br w-full from-green-400 to-blue-500 text-gray-900 hover:bg-gradient-to-b transition duration-300"
                                    disabled={loading.signin}
                                >
                                    {loading.signin ? <Loader2 className="animate-spin" /> : "Sign In"}
                                </Button>

                                <Button
                                    onClick={handleGoogleSignIn}
                                    variant="outline"
                                    className="w-full mt-3"
                                    disabled={loading.google}
                                >
                                    {loading.google ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <FaGoogle />
                                            Sign in with Google
                                        </div>
                                    )}
                                </Button>

                                <Button
                                    onClick={() => setForgotPassword(true)}
                                    variant="link"
                                    className="w-full text-red-300"
                                >
                                    Forgot Password
                                </Button>

                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </TabsContent>

                        <TabsContent value="signup">
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaUser />
                                    </div>
                                    <Input
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleInputChange}
                                        value={form.name}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaEnvelope />
                                    </div>
                                    <Input
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleInputChange}
                                        value={form.email}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                                        <FaLock />
                                    </div>
                                    <Input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        onChange={handleInputChange}
                                        value={form.password}
                                        className="pl-10"
                                    />
                                </div>
                                <Button
                                    onClick={handleSignUp}
                                    className="bg-gradient-to-br w-full from-green-400 to-blue-500 text-gray-900 hover:bg-gradient-to-b transition duration-300"
                                    disabled={loading.signup}
                                >
                                    {loading.signup ? <Loader2 className="animate-spin" /> : "Sign Up"}
                                </Button>

                                <Button
                                    onClick={handleGoogleSignIn}
                                    variant="outline"
                                    className="w-full mt-3"
                                    disabled={loading.google}
                                >
                                    {loading.google ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <FaGoogle />
                                            Sign up with Google
                                        </div>
                                    )}
                                </Button>

                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default AuthModal;
