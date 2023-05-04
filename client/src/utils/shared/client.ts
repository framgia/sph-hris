import { GraphQLClient } from 'graphql-request'
import { customHttpHeader } from '../customHttpHeaders'

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
  headers: customHttpHeader()
})
