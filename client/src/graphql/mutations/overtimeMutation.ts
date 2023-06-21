import { gql } from 'graphql-request'

export const CREATE_OVERTIME_MUTATION = gql`
  mutation ($overtime: CreateOvertimeRequestInput!) {
    createOvertime(overtime: $overtime) {
      id
    }
  }
`

export const APROVE_DISAPPROVE_OVERTIME_MUTATION = gql`
  mutation ($overtimeApproval: ApproveOvertimeRequestInput!) {
    approveDisapproveOvertime(approvingData: $overtimeApproval)
  }
`

export const CREATE_BULK_OVERTIME_MUTATION = gql`
  mutation ($request: CreateBulkOvertimeRequestInput!) {
    createBulkOvertime(request: $request) {
      id
    }
  }
`
