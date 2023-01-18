import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest): Promise<NextResponse | undefined> {
  const session = await getToken({ req, secret: process.env.NEXT_PUBLIC_JWT_SECRET })

  if (session == null) {
    return NextResponse.rewrite(new URL('/sign-in', req.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)']
}
