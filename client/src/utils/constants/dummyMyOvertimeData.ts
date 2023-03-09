import { IMyOvertime } from './../types/overtimeTypes'

export const dummyMyOvertimeData: IMyOvertime[] = [
  {
    id: 1,
    multiProjects: [
      {
        id: 1,
        projectId: 1,
        projectLeaderId: 2
      },
      {
        id: 2,
        projectId: 2,
        projectLeaderId: 3
      }
    ],
    overtimeDate: '2023-02-01 02:34:26.0000000',
    requestedMinutes: 120,
    approvedMinutes: 120,
    isLeaderApproved: null,
    isManagerApproved: null,
    remarks:
      '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    createdAt: '2023-02-01 02:34:26.0000000'
  }
]
