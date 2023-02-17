import { IOvertimeManagement } from '../interfaces'

export const dummyOvertimeManagementData: IOvertimeManagement[] = [
  {
    id: 1,
    project: [
      {
        label: 'Admin',
        value: 'Admin'
      },
      {
        label: 'Casec',
        value: 'Casec'
      },
      {
        label: 'Shaperon',
        value: 'Shaperon'
      }
    ],
    user: {
      id: 1,
      name: 'Joshua Galit',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-01 02:34:26.0000000',
    overtimeIn: '18:30',
    overtimeOut: '20:30',
    requestedHours: 5,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-02-01 02:34:26.0000000',
    remarks:
      '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 2,
    project: [
      {
        label: 'Casec',
        value: 'Casec'
      },
      {
        label: 'Admin',
        value: 'Admin'
      },
      {
        label: 'Casec',
        value: 'Casec'
      }
    ],
    user: {
      id: 2,
      name: 'Abdul Jalil Palala',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-02 02:34:26.0000000',
    overtimeIn: '16:30',
    overtimeOut: '24:30',
    requestedHours: 6,
    supervisor: 'Jermiah Gerico',
    dateFiled: '2023-02-02 02:34:26.0000000',
    remarks:
      '2 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'disapproved'
  },
  {
    id: 3,
    project: [
      {
        label: 'Shaperon',
        value: 'Shaperon'
      },
      {
        label: 'Casec',
        value: 'Casec'
      },
      {
        label: 'Admin',
        value: 'Admin'
      }
    ],
    user: {
      id: 3,
      name: 'Regelio Oliverio',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-03 02:34:26.0000000',
    overtimeIn: '14:30',
    overtimeOut: '22:30',
    requestedHours: 8,
    supervisor: 'Inah Pangutana',
    dateFiled: '2023-02-02 02:34:26.0000000',
    remarks:
      '3 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'approved'
  },
  {
    id: 4,
    project: [
      {
        label: '01Booster',
        value: '01Booster'
      },
      {
        label: 'Shaperon',
        value: 'Shaperon'
      },
      {
        label: 'Casec',
        value: 'Casec'
      }
    ],
    user: {
      id: 4,
      name: 'Arden Abrenica',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-04 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '18:30',
    requestedHours: 6,
    supervisor: 'Zion Desk',
    dateFiled: '2023-02-01 02:34:26.0000000',
    remarks:
      '4 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'approved'
  },
  {
    id: 5,
    project: [
      {
        label: 'Edge',
        value: 'Edge'
      },
      {
        label: '01Booster',
        value: '01Booster'
      },
      {
        label: 'Shaperon',
        value: 'Shaperon'
      }
    ],
    user: {
      id: 5,
      name: 'Nilo Castillano Jr',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-05 02:34:26.0000000',
    overtimeIn: '15:30',
    overtimeOut: '19:30',
    requestedHours: 7,
    supervisor: 'Inah Pangutana',
    dateFiled: '2023-02-07 02:34:26.0000000',
    remarks:
      '6 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 6,
    project: [
      {
        label: 'DTS',
        value: 'DTS'
      },
      {
        label: 'Edge',
        value: 'Edge'
      },
      {
        label: '01Booster',
        value: '01Booster'
      }
    ],
    user: {
      id: 5,
      name: 'Paul Erick',
      role: {
        id: 1,
        name: 'Software Quality Assurance'
      }
    },
    date: '2023-02-06 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '18:30',
    requestedHours: 8,
    supervisor: 'Jeremiah Gerico',
    dateFiled: '2023-02-02 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 7,
    project: [
      {
        label: 'OJT',
        value: 'OJT'
      },
      {
        label: 'DTS',
        value: 'DTS'
      },
      {
        label: 'Edge',
        value: 'Edge'
      }
    ],
    user: {
      id: 6,
      name: 'John Roy Cabezas',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-03-05 02:34:26.0000000',
    overtimeIn: '16:30',
    overtimeOut: '18:30',
    requestedHours: 4,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-03-02 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 8,
    project: [
      {
        label: 'Development Training',
        value: 'Development Training'
      },
      {
        label: 'OJT',
        value: 'OJT'
      },
      {
        label: 'DTS',
        value: 'DTS'
      }
    ],
    user: {
      id: 5,
      name: 'Nilo Castillano Jr',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-06 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '20:30',
    requestedHours: 5,
    supervisor: 'Inah Pangutana',
    dateFiled: '2023-02-07 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 9,
    project: [
      {
        label: 'AAA Education',
        value: 'AAA Education'
      },
      {
        label: 'Development Training',
        value: 'Development Training'
      },
      {
        label: 'OJT',
        value: 'OJT'
      }
    ],
    user: {
      id: 1,
      name: 'Joshua Galit',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-01-04 02:34:26.0000000',
    overtimeIn: '18:30',
    overtimeOut: '24:30',
    requestedHours: 4,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-03-08 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 10,
    project: [
      {
        label: 'Yamato',
        value: 'Yamato'
      },
      {
        label: 'AAA Education',
        value: 'AAA Education'
      },
      {
        label: 'Development Training',
        value: 'Development Training'
      }
    ],
    user: {
      id: 1,
      name: 'James Bond',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-06 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '20:30',
    requestedHours: 9,
    supervisor: 'Jeremiah Caballero',
    dateFiled: '2023-02-08 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 11,
    project: [
      {
        label: 'Next Base',
        value: 'Next Base'
      },
      {
        label: 'Yamato',
        value: 'Yamato'
      },
      {
        label: 'AAA Education',
        value: 'AAA Education'
      }
    ],
    user: {
      id: 1,
      name: 'Robin Hook',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-01 02:34:26.0000000',
    overtimeIn: '18:30',
    overtimeOut: '20:30',
    requestedHours: 5,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-02-01 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 12,
    project: [
      {
        label: 'MetaJobs',
        value: 'MetaJobs'
      },
      {
        label: 'Next Base',
        value: 'Next Base'
      },
      {
        label: 'Yamato',
        value: 'Yamato'
      }
    ],
    user: {
      id: 1,
      name: 'John Gilbert',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-02 02:34:26.0000000',
    overtimeIn: '16:30',
    overtimeOut: '24:30',
    requestedHours: 6,
    supervisor: 'Jermiah Gerico',
    dateFiled: '2023-02-02 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'disapproved'
  },
  {
    id: 13,
    project: [
      {
        label: 'Prrrr',
        value: 'Prrrr'
      },
      {
        label: 'MetaJobs',
        value: 'MetaJobs'
      },
      {
        label: 'Next Base',
        value: 'Next Base'
      }
    ],
    user: {
      id: 1,
      name: 'Ohh Men',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-03 02:34:26.0000000',
    overtimeIn: '14:30',
    overtimeOut: '22:30',
    requestedHours: 8,
    supervisor: 'Inah Pangutana',
    dateFiled: '2023-02-02 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'approved'
  },
  {
    id: 14,
    project: [
      {
        label: 'Aironworks',
        value: 'Aironworks'
      },
      {
        label: 'Prrrr',
        value: 'Prrrr'
      },
      {
        label: 'MetaJobs',
        value: 'MetaJobs'
      }
    ],
    user: {
      id: 1,
      name: 'The Black Parade',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-04 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '18:30',
    requestedHours: 6,
    supervisor: 'Zion Desk',
    dateFiled: '2023-02-01 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'approved'
  },
  {
    id: 15,
    project: [
      {
        label: 'Osaka Metro',
        value: 'Osaka Metro'
      },
      {
        label: 'Aironworks',
        value: 'Aironworks'
      },
      {
        label: 'Prrrr',
        value: 'Prrrr'
      }
    ],
    user: {
      id: 1,
      name: 'In The moon',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-05 02:34:26.0000000',
    overtimeIn: '15:30',
    overtimeOut: '19:30',
    requestedHours: 7,
    supervisor: 'Inah Pangutana',
    dateFiled: '2023-02-07 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 16,
    project: [
      {
        label: 'Admin',
        value: 'Admin'
      },
      {
        label: 'Osaka Metro',
        value: 'Osaka Metro'
      },
      {
        label: 'Aironworks',
        value: 'Aironworks'
      }
    ],
    user: {
      id: 1,
      name: 'Hello No',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-06 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '18:30',
    requestedHours: 8,
    supervisor: 'Jeremiah Gerico',
    dateFiled: '2023-02-02 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 17,
    project: [
      {
        label: 'Casec',
        value: 'Casec'
      },
      {
        label: 'Admin',
        value: 'Admin'
      },
      {
        label: 'Osaka Metro',
        value: 'Osaka Metro'
      }
    ],
    user: {
      id: 1,
      name: 'The light well',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-03-05 02:34:26.0000000',
    overtimeIn: '16:30',
    overtimeOut: '18:30',
    requestedHours: 4,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-03-02 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 18,
    project: [
      {
        label: 'Development Training',
        value: 'Development Training'
      },
      {
        label: 'Casec',
        value: 'Casec'
      },
      {
        label: 'Admin',
        value: 'Admin'
      }
    ],
    user: {
      id: 1,
      name: 'Bring it on',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-06 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '20:30',
    requestedHours: 5,
    supervisor: 'Inah Pangutana',
    dateFiled: '2023-02-07 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 19,
    project: [
      {
        label: 'Edge',
        value: 'Edge'
      },
      {
        label: 'Development Training',
        value: 'Development Training'
      },
      {
        label: 'Casec',
        value: 'Casec'
      }
    ],
    user: {
      id: 1,
      name: 'Joshua Galit',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-01-04 02:34:26.0000000',
    overtimeIn: '18:30',
    overtimeOut: '24:30',
    requestedHours: 4,
    supervisor: 'Karlo Lee',
    dateFiled: '2023-03-08 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  },
  {
    id: 20,
    project: [
      {
        label: 'DTS',
        value: 'DTS'
      },
      {
        label: 'Edge',
        value: 'Edge'
      },
      {
        label: 'Development Training',
        value: 'Development Training'
      }
    ],
    user: {
      id: 1,
      name: 'Joshua Galit',
      role: {
        id: 1,
        name: 'Developer'
      }
    },
    date: '2023-02-06 02:34:26.0000000',
    overtimeIn: '12:30',
    overtimeOut: '20:30',
    requestedHours: 9,
    supervisor: 'Jeremiah Caballero',
    dateFiled: '2023-02-08 02:34:26.0000000',
    remarks:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.',
    status: 'pending'
  }
]
