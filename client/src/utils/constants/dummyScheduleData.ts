import moment from 'moment'

import { ISchedule } from './../types/scheduleTypes'

export const scheduleList: ISchedule[] = [
  {
    id: 1,
    scheduleName: 'Emplopyee DEVS SHIFt',
    mondaySelected: true,
    monday: {
      timeIn: moment('09:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('06:30PM', 'hh:mmA').format('HH:mm')
    },
    tuesdaySelected: false,
    tuesday: {
      timeIn: '',
      timeOut: ''
    },
    wednesdaySelected: false,
    wednesday: {
      timeIn: '',
      timeOut: ''
    },
    thursdaySelected: true,
    thursday: {
      timeIn: moment('06:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('06:30PM', 'hh:mmA').format('HH:mm')
    },
    fridaySelected: false,
    friday: {
      timeIn: '',
      timeOut: ''
    },
    saturdaySelected: false,
    saturday: {
      timeIn: '',
      timeOut: ''
    },
    sundaySelected: false,
    sunday: {
      timeIn: '',
      timeOut: ''
    }
  },
  {
    id: 2,
    scheduleName: 'ESL TEACHER Group A',
    mondaySelected: true,
    monday: {
      timeIn: moment('09:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('05:30PM', 'hh:mmA').format('HH:mm')
    },
    tuesdaySelected: false,
    tuesday: {
      timeIn: '',
      timeOut: ''
    },
    wednesdaySelected: false,
    wednesday: {
      timeIn: '',
      timeOut: ''
    },
    thursdaySelected: true,
    thursday: {
      timeIn: moment('09:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('05:30PM', 'hh:mmA').format('HH:mm')
    },
    fridaySelected: false,
    friday: {
      timeIn: '',
      timeOut: ''
    },
    saturdaySelected: false,
    saturday: {
      timeIn: '',
      timeOut: ''
    },
    sundaySelected: false,
    sunday: {
      timeIn: moment('07:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('06:30PM', 'hh:mmA').format('HH:mm')
    }
  },
  {
    id: 3,
    scheduleName: 'ESL TEACHER (CHEVY)',
    mondaySelected: true,
    monday: {
      timeIn: moment('04:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('03:30PM', 'hh:mmA').format('HH:mm')
    },
    tuesdaySelected: true,
    tuesday: {
      timeIn: moment('09:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('05:30PM', 'hh:mmA').format('HH:mm')
    },
    wednesdaySelected: false,
    wednesday: {
      timeIn: moment('09:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('05:30PM', 'hh:mmA').format('HH:mm')
    },
    thursdaySelected: true,
    thursday: {
      timeIn: moment('09:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('05:30PM', 'hh:mmA').format('HH:mm')
    },
    fridaySelected: false,
    friday: {
      timeIn: '',
      timeOut: ''
    },
    saturdaySelected: false,
    saturday: {
      timeIn: '',
      timeOut: ''
    },
    sundaySelected: false,
    sunday: {
      timeIn: moment('07:30AM', 'hh:mmA').format('HH:mm'),
      timeOut: moment('06:30PM', 'hh:mmA').format('HH:mm')
    }
  }
]
