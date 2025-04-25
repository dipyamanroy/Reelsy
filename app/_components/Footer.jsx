"use client"

import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa"
import Link from "next/link"
import React from "react"

function Footer() {
    return (
        <footer className=" text-gray-400 w-full py-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                {/* Logo + Description */}
                <div>
                    <h2 className="text-2xl font-bold text-white">Reelsy</h2>
                    <p className="text-sm mt-2 max-w-xs">
                        AI-powered short-form content generation, crafted for speed and scale.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                    <Link href="/terms" className="hover:text-white transition">Terms</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                </div>

                {/* Socials */}
                <div className="flex gap-5 text-xl">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub className="hover:text-white transition" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter className="hover:text-white transition" />
                    </a>
                    <a href="mailto:hello@reelsy.ai" aria-label="Email">
                        <FaEnvelope className="hover:text-white transition" />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 text-xs text-gray-400 text-center">
                © {new Date().getFullYear()} Reelsy. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
