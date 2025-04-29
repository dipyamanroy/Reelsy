"use client";
import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/configs/firebase';
import { AuthContext } from './_context/AuthContext';
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';

function Provider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const CreateUser = useMutation(api.users.CreateNewUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                queueMicrotask(async () => {
                    const result = await CreateUser({
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    });
                    setUser(result);
                    setLoading(false);
                });
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </NextThemesProvider>
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};

export default Provider;
