import { gql } from 'graphql-request'

export const CREATE_CHANGE_SCHEDULE_MUTATION = gql`
  mutation ($request: ChangeSchedRequestInput!) {
    changeScheduleRequest(request: $request) {
      id
    }
  }
`
