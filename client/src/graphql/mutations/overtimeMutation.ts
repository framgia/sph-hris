import { gql } from 'graphql-request'
export const CREATE_OVERTIME_MUTATION = gql`
  mutation ($overtime: CreateOvertimeRequestInput!) {
    createOvertime(overtime: $overtime) {
      id
    }
  }
`
