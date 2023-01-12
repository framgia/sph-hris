import { GraphQLClient, gql } from 'graphql-request'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? `http://localhost:5257/graphql`

const graphQLClient = new GraphQLClient(API_URL)

const graphqlQuery = async (queryString: string): Promise<any> => {
  const data = await graphQLClient.request(
    gql`
      ${queryString}
    `
  )
  return data
}

export default graphqlQuery
