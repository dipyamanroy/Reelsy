"use client"

import { auth } from '@/configs/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'

function Authentication({ children }) {
    const provider = new GoogleAuthProvider();

    const onSignInClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                console.error("Sign-in error:", error);
            });
    }

    return React.cloneElement(children, { onClick: onSignInClick })
}

export default Authentication