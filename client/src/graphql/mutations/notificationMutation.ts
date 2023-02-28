import { gql } from 'graphql-request'

export const NOTIFICATION_READ_AT_MUTATION = gql`
  mutation ($notification: NotificationRequestInput!) {
    readNotification(notification: $notification)
  }
`
