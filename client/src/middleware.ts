import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'
import { isMaintenanceStatus } from '~/utils/constants/isMaintenanceStatus'

export default async function middleware(req: NextRequest): Promise<NextResponse | undefined> {
  const { pathname } = new URL(req.url)
  const isUnderMaintenancePage = pathname === '/under-maintenance'
  const session = await getToken({ req, secret: process.env.NEXT_PUBLIC_JWT_SECRET })
  const isMaintenanceVariableSet = process.env.NEXT_PUBLIC_UNDER_MAINTENANCE !== undefined
  const isUnderMaintenance = process.env.NEXT_PUBLIC_UNDER_MAINTENANCE === isMaintenanceStatus.TRUE

  const rewriteURL = (path: string): NextResponse => {
    return NextResponse.rewrite(new URL(path, req.url))
  }

  if (isUnderMaintenancePage) {
    return rewriteURL('/404')
  }

  if (isUnderMaintenance && isMaintenanceVariableSet) {
    return rewriteURL('/under-maintenance')
  }

  if (session === null) {
    return rewriteURL('/sign-in')
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)']
}
