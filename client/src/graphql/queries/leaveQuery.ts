import { gql } from 'graphql-request'
export const GET_MY_LEAVES_QUERY = gql`
  query ($userId: Int!, $year: Int!) {
    leaves(userId: $userId, year: $year) {
      heatmap {
        january {
          value
          day
        }
        february {
          value
          day
        }
        march {
          value
          day
        }
        april {
          value
          day
        }
        may {
          value
          day
        }
        june {
          value
          day
        }
        july {
          value
          day
        }
        august {
          value
          day
        }
        september {
          value
          day
        }
        october {
          value
          day
        }
        november {
          value
          day
        }
        december {
          value
          day
        }
      }
      table {
        date
        leaveTypeId
        isWithPay
        reason
        numLeaves
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

export const GET_YEARLY_ALL_LEAVES_QUERY = gql`
  query ($year: Int!) {
    yearlyAllLeaves(year: $year) {
      heatmap {
        january {
          value
          day
        }
        february {
          value
          day
        }
        march {
          value
          day
        }
        april {
          value
          day
        }
        may {
          value
          day
        }
        june {
          value
          day
        }
        july {
          value
          day
        }
        august {
          value
          day
        }
        september {
          value
          day
        }
        october {
          value
          day
        }
        november {
          value
          day
        }
        december {
          value
          day
        }
      }
      table {
        date
        leaveTypeId
        isWithPay
        reason
        numLeaves
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
