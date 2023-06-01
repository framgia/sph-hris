import { gql } from 'graphql-request'
export const GET_LEAVE_TYPES_QUERY = gql`
  {
    leaveTypes {
      id
      name
    }
  }
`
export const GET_MY_LEAVES_QUERY = gql`
  query ($userId: Int!, $year: Int!) {
    leaves(userId: $userId, year: $year) {
      user {
        id
        paidLeaves
      }
      heatmap {
        january {
          value
          day
          leaveName
        }
        february {
          value
          day
          leaveName
        }
        march {
          value
          day
          leaveName
        }
        april {
          value
          day
          leaveName
        }
        may {
          value
          day
          leaveName
        }
        june {
          value
          day
          leaveName
        }
        july {
          value
          day
          leaveName
        }
        august {
          value
          day
          leaveName
        }
        september {
          value
          day
          leaveName
        }
        october {
          value
          day
          leaveName
        }
        november {
          value
          day
          leaveName
        }
        december {
          value
          day
          leaveName
        }
      }
      table {
        leaveId
        date
        leaveTypeId
        isWithPay
        reason
        numLeaves
        status
        userName
        createdAt
      }
      breakdown {
        sickLeave
        undertime
        vacationLeave
        emergencyLeave
        bereavementLeave
        maternityLeave
        withoutPayTotal
        withPayTotal
        pending
      }
    }
  }
`

export const GET_YEARLY_ALL_LEAVES_QUERY = gql`
  query ($year: Int!) {
    yearlyAllLeaves(year: $year) {
      heatmap {
        january {
          value
          day
          leaveName
        }
        february {
          value
          day
          leaveName
        }
        march {
          value
          day
          leaveName
        }
        april {
          value
          day
          leaveName
        }
        may {
          value
          day
          leaveName
        }
        june {
          value
          day
          leaveName
        }
        july {
          value
          day
          leaveName
        }
        august {
          value
          day
          leaveName
        }
        september {
          value
          day
          leaveName
        }
        october {
          value
          day
          leaveName
        }
        november {
          value
          day
          leaveName
        }
        december {
          value
          day
          leaveName
        }
      }
      table {
        date
        leaveTypeId
        isWithPay
        reason
        numLeaves
        status
        userName
        createdAt
      }
      breakdown {
        sickLeave
        undertime
        vacationLeave
        emergencyLeave
        bereavementLeave
        maternityLeave
        withoutPayTotal
        withPayTotal
      }
    }
  }
`
export const GET_SPECIFIC_USER_LEAVE_QUERY = gql`
  query ($leaveId: Int!) {
    userLeave(leaveId: $leaveId) {
      id
      userId
      userName
      userRole
      leaveProjects {
        projectId
        project {
          name
        }
        projectLeaderId
        projectLeader {
          name
        }
      }
      leaveType
      leaveTypeId
      managerId
      manager
      otherProject
      reason
      leaveDate
      isWithPay
      isLeaderApproved
      isManagerApproved
      days
      createdAt
      avatar
    }
  }
`
