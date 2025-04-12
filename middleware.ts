import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const haveAccessToken = Boolean(request.cookies.get('accessToken'))
  const haveRefreshToken = Boolean(request.cookies.get('refreshToken'))

  if (haveAccessToken && haveRefreshToken) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
  matcher: ['/profile/:path*']
}
