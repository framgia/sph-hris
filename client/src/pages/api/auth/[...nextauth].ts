import NextAuth from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions } from 'next-auth'
import { setCookie } from 'cookies-next'

import GoogleProvider from 'next-auth/providers/google'

type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    session: {
      maxAge: 60 * 60 * 24 * 7 // 7 days
    },
    callbacks: {
      async jwt({ token, user, account }) {
        if (account !== null && user?.email !== undefined) {
          token.accessToken = account?.access_token
          token.refreshToken = account?.refresh_token
          return token
        }
        return token
      },
      async session({ session, token, user }) {
        session.googleAccessToken = token.accessToken as string
        session.googleRefreshToken = token.refreshToken as string
        setCookie('access_token', session.googleAccessToken, { req, res })
        return session
      }
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse): any => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
