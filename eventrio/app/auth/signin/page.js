'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Sign in to your account</h2>
                </div>
                <button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    )
} 