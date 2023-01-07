import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL as string)

// Set a single header
// client.setHeader('authorization', 'Bearer MY_TOKEN')

// Override all existing headers
// client.setHeaders({
//   authorization: 'Bearer MY_TOKEN',
//   anotherheader: 'header_value'
// })
