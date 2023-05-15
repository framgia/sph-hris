import { gql } from 'graphql-request'

export const NOTIFICATION_READ_AT_MUTATION = gql`
  mutation ($notification: NotificationRequestInput!) {
    readNotification(notification: $notification)
  }
`
export const READ_ALL_NOTIFICATIONS = gql`
  mutation ($id: Int!) {
    isReadAll(id: $id) {
      id
      readAt
      isRead
    }
  }
`
