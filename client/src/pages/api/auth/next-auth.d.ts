// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session, User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    googleAccessToken: string
    googleRefreshToken: string
    googleIdToken: string
  }

  interface User {
    accessToken: string
  }
}
