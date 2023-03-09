import { IMyOvertimeData } from './../interfaces'

export const dummyMyOvertimeData: IMyOvertimeData[] = [
  {
    id: 2,
    projects: [
      {
        id: 6152,
        project: {
          id: 1,
          name: 'Admin'
        },
        projectLeader: {
          id: 2,
          name: 'Alvil Balbuena'
        }
      },
      {
        id: 6153,
        project: {
          id: 13,
          name: 'MetaJobs'
        },
        projectLeader: {
          id: 2,
          name: 'Alvil Balbuena'
        }
      }
    ],
    otherProject: '',
    supervisor: 'Daisuke Nishide',
    dateFiled: '2023-03-07T18:23:12.285+08:00',
    overtimeDate: '2023-02-17T00:00:00.000+08:00',
    requestedMinutes: 0,
    approvedMinutes: null,
    isLeaderApproved: null,
    isManagerApproved: null,
    remarks: 'I have overtime sh',
    createdAt: '2023-03-12T18:03:06.103+08:00'
  },
  {
    id: 1002,
    projects: [
      {
        id: 8138,
        project: {
          id: 2,
          name: 'Casec'
        },
        projectLeader: {
          id: 2,
          name: 'Alvil Balbuena'
        }
      }
    ],
    otherProject: '',
    supervisor: 'Ryan Dupay',
    dateFiled: '2023-03-09T17:05:03.446+08:00',
    overtimeDate: '2023-02-21T00:00:00.000+08:00',
    requestedMinutes: 0,
    approvedMinutes: null,
    isLeaderApproved: null,
    isManagerApproved: null,
    remarks: 'f aadf asdf',
    createdAt: '2023-03-12T18:03:06.104+08:00'
  },
  {
    id: 1003,
    projects: [
      {
        id: 8139,
        project: {
          id: 17,
          name: 'Others'
        },
        projectLeader: {
          id: 1,
          name: 'Abdul Jalil Palala'
        }
      }
    ],
    otherProject: 'HRIS',
    supervisor: 'Ryan Dupay',
    dateFiled: '2023-03-09T17:05:28.380+08:00',
    overtimeDate: '2023-03-02T00:00:00.000+08:00',
    requestedMinutes: 0,
    approvedMinutes: null,
    isLeaderApproved: null,
    isManagerApproved: false,
    remarks: ' af adf',
    createdAt: '2023-03-12T18:03:06.104+08:00'
  },
  {
    id: 1004,
    projects: [
      {
        id: 8140,
        project: {
          id: 17,
          name: 'Others'
        },
        projectLeader: {
          id: 1,
          name: 'Abdul Jalil Palala'
        }
      }
    ],
    otherProject: 'HRIS',
    supervisor: 'Daisuke Nishide',
    dateFiled: '2023-03-09T18:27:40.470+08:00',
    overtimeDate: '2023-03-01T00:00:00.000+08:00',
    requestedMinutes: 0,
    approvedMinutes: null,
    isLeaderApproved: false,
    isManagerApproved: null,
    remarks: 'Approved',
    createdAt: '2023-03-12T18:03:06.104+08:00'
  },
  {
    id: 2002,
    projects: [
      {
        id: 9136,
        project: {
          id: 1,
          name: 'Admin'
        },
        projectLeader: {
          id: 1,
          name: 'Abdul Jalil Palala'
        }
      },
      {
        id: 9137,
        project: {
          id: 4,
          name: '01Booster'
        },
        projectLeader: {
          id: 2,
          name: 'Alvil Balbuena'
        }
      },
      {
        id: 9138,
        project: {
          id: 16,
          name: 'OsakaMetro'
        },
        projectLeader: {
          id: 1,
          name: 'Abdul Jalil Palala'
        }
      }
    ],
    otherProject: '',
    supervisor: 'Daisuke Nishide',
    dateFiled: '2023-03-10T15:10:23.423+08:00',
    overtimeDate: '2023-03-03T00:00:00.000+08:00',
    requestedMinutes: 0,
    approvedMinutes: null,
    isLeaderApproved: true,
    isManagerApproved: false,
    remarks: 'asf',
    createdAt: '2023-03-12T18:03:06.107+08:00'
  },
  {
    id: 2003,
    projects: [
      {
        id: 9139,
        project: {
          id: 17,
          name: 'Others'
        },
        projectLeader: {
          id: 1,
          name: 'Abdul Jalil Palala'
        }
      },
      {
        id: 9140,
        project: {
          id: 4,
          name: '01Booster'
        },
        projectLeader: {
          id: 2,
          name: 'Alvil Balbuena'
        }
      },
      {
        id: 9141,
        project: {
          id: 17,
          name: 'Others'
        },
        projectLeader: {
          id: 2,
          name: 'Alvil Balbuena'
        }
      }
    ],
    otherProject: 'HRIS,Test1',
    supervisor: 'Ryan Dupay',
    dateFiled: '2023-03-10T15:13:28.105+08:00',
    overtimeDate: '2023-03-02T00:00:00.000+08:00',
    requestedMinutes: 0,
    approvedMinutes: null,
    isLeaderApproved: true,
    isManagerApproved: true,
    remarks: 'asdf',
    createdAt: '2023-03-12T18:03:06.107+08:00'
  }
]
