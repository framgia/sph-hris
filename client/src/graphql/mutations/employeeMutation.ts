import { gql } from 'graphql-request'

export const CREATE_NEW_EMPLOYEE_MUTATION = gql`
  mutation ($request: AddNewEmployeeRequestInput!) {
    addNewEmployee(request: $request)
  }
`
