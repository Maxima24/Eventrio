import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    throw new Error('Missing Google OAuth credentials')
}

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Missing NEXTAUTH_SECRET')
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile"
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('SignIn callback:', { user, account, profile })
            return true
        },
        async redirect({ url, baseUrl }) {
            console.log('Redirect callback:', { url, baseUrl })
            // Allow relative URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`
            // Allow URLs from the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    user,
                }
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            session.accessToken = token.accessToken
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            return true
        }
    },
    debug: true,
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
})
