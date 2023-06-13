import { GraphQLClient } from 'graphql-request'
import { deleteCookie, getCookie } from 'cookies-next'
import { signOut } from 'next-auth/react'

type RESULT = {
  response: { status: number }
}

// export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL as string)
export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
  responseMiddleware: (response) => {
    const resultResponse: RESULT = JSON.parse(JSON.stringify(response))
    if (response instanceof Error && resultResponse.response.status === 401) {
      deleteCookie('authorization')
      deleteCookie('access_token')
      void signOut({ callbackUrl: '/sign-in' })
    }
  }
})

const addRequestInterceptor = (client: GraphQLClient): GraphQLClient => {
  const accessToken = getCookie('access_token')
  const authtoken = getCookie('authorization')
  client.setHeaders({ access_token: accessToken as string, authorization: authtoken as string })
  // client.setHeaders({ authorization: accessToken as string })

  return client
}

export const client = (): GraphQLClient => addRequestInterceptor(graphqlClient)
