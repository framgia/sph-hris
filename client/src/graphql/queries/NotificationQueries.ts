import { gql } from 'graphql-request'

export const GET_ALL_USER_NOTIFICATION = gql`
  query ($id: Int!) {
    notificationByRecipientId(id: $id) {
      id
      type
      data
      readAt
      isRead
      createdAt
    }
  }
`
