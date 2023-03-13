import { IOvertimeManagement, IOvertimeManagementManager } from '../interfaces'

export const dummyOvertimeManagementData: IOvertimeManagement[] | IOvertimeManagementManager[] = [
  {
    id: 1,
    projects: [
      {
        project_name: {
          value: '1',
          label: 'Admin'
        },
        project_leader: {
          value: '1',
          label: 'Abdul Jalil Palala'
        }
      },
      {
        project_name: {
          value: '2',
          label: 'Casec'
        },
        project_leader: {
          value: '2',
          label: 'Alvin'
        }
      }
    ],
    user: {
      id: 1,
      name: 'Joshua Galit',
      link: 'https://',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    manager: {
      value: '1',
      label: 'Daisuke Nishide'
    },
    date: '2023-02-01 02:34:26.0000000',
    overtimeIn: '18:30',
    overtimeOut: '20:30',
    approvedMinutes: 5,
    requestedMinutes: 5,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-02-01 02:34:26.0000000',
    remarks:
      '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  }
]
//   {
//     id: 2,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'Abdul Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 3,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'Abdul Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 4,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'jrdjdfhgj Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Jdfghdfghlit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 7,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'Aaf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 8,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'Abdul Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 7,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'Abdul Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 9,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'oy;srfthg Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 2,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'Abdul Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 10,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'iltert Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   },
//   {
//     id: 11,
//     projects: [
//       {
//         project_name: {
//           value: '1',
//           label: 'Admin'
//         },
//         project_leader: {
//           value: '1',
//           label: 'jjksrg Jfadf asdf adf'
//         }
//       },
//       {
//         project_name: {
//           value: '2',
//           label: 'Casec'
//         },
//         project_leader: {
//           value: '2',
//           label: 'Alvin'
//         }
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Joshua Galit',
//       role: {
//         id: 1,
//         name: 'Developer'
//       }
//     },
//     manager: {
//       value: '1',
//       label: 'Daisuke Nishide'
//     },
//     date: '2023-02-01 02:34:26.0000000',
//     overtimeIn: '18:30',
//     overtimeOut: '20:30',
//     requestedHours: 5,
//     supervisor: 'Karlo Lee',
//     dateFiled: '2023-02-01 02:34:26.0000000',
//     remarks:
//       '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
//     status: 'pending'
//   }
// ]
