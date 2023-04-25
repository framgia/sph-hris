import { gql } from 'graphql-request'

export const GET_ALL_EMPLOYEE_SCHEDULE = gql`
  query {
    allEmployeeScheduleDetails {
      id
      scheduleName
    }
  }
`

export const GET_EMPLOYEE_SCHEDULE = gql`
  query ($employeeScheduleId: Int!) {
    employeeScheduleDetails(employeeScheduleId: $employeeScheduleId) {
      scheduleName
      days {
        isDaySelected
        workingDay
        timeIn
        timeOut
      }
    }
  }
`

export const GET_EMPLOYEES_BY_SCHEDULE = gql`
  query ($employeeScheduleId: Int!) {
    employeesBySchedule(employeeScheduleId: $employeeScheduleId) {
      id
      name
      avatarLink
      position {
        name
      }
      isOnline
    }
  }
`
