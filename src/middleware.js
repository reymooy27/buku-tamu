import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req){
  const token = await getToken({req})
  
  console.log('Token: ' + JSON.stringify(token))
  return NextResponse.next()
}

export const config={
  matcher: ['/dashboard/:path*']
}