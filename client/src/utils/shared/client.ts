import { GraphQLClient } from 'graphql-request'
import { deleteCookie, getCookie } from 'cookies-next'
import { signOut } from 'next-auth/react'

type RESULT = {
  response: { status: number }
}

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
  requestMiddleware: (request) => {
    const accessToken = getCookie('access_token')
    const authtoken = getCookie('authorization')
    return {
      ...request,
      headers: {
        ...request.headers,
        'access-token': accessToken as string,
        authorization: authtoken as string
      }
    }
  },
  responseMiddleware: (response) => {
    const resultResponse: RESULT = JSON.parse(JSON.stringify(response))
    if (response instanceof Error && resultResponse.response.status === 401) {
      deleteCookie('authorization')
      deleteCookie('access_token')
      void signOut({ callbackUrl: '/sign-in' })
    }
  }
})
