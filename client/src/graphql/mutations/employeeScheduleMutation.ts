import { gql } from 'graphql-request'

export const CREATE_EMPLOYEE_SCHEDULE = gql`
  mutation ($request: CreateEmployeeScheduleRequestInput!) {
    createEmployeeSchedule(request: $request){
    }
  }
`
export const EDIT_EMPLOYEE_SCHEDULE = gql`
  mutation ($request: UpdateEmployeeScheduleRequestInput!) {
    updateEmployeeSchedule(request: $request){
    }
  }
`
export const DELETE_EMPLOYEE_SCHEDULE = gql`
  mutation ($request: DeleteEmployeeScheduleRequestInput!) {
    deleteEmployeeSchedule(request: $request)
  }
`

export const ADD_EMPLOYEE_TO_SCHEDULE = gql`
  mutation ($request: AddMemberToScheduleRequestInput!) {
    addMembersToSchedule(request: $request)
  }
`
export const REASSIGN_EMPLOYEE_TO_SCHEDULE = gql`
  mutation ($request: UpdateMemberScheduleRequestInput!) {
    updateMemberSchedule(request: $request)
  }
`
