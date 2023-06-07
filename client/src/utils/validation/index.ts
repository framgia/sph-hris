import * as yup from 'yup'

import { WorkInterruptionType } from './../constants/work-status'

export const SelectSchema = yup.object().shape({
  label: yup.string().required(),
  value: yup.string().required()
})

export const ConfirmInterruptionSchema = yup.object().shape({
  work_interruption: yup.string().required().label('Work Interruption'),
  specify_reason: yup
    .string()
    .nullable(true)
    .label('Specify Reason')
    .when('work_interruption', (workInterruption, schema) => {
      return Number(workInterruption) === Number(WorkInterruptionType.OTHERS)
        ? schema.required()
        : schema
    }),
  time_out: yup.string().required().label('Time out'),
  time_in: yup.string().required().label('Time in'),
  remarks: yup.string().label('Remarks')
})

export const TimeEntrySchema = yup.object().shape({
  time_out: yup.string().required().label('Time out'),
  time_in: yup.string().required().label('Time in'),
  remarks: yup.string().label('Remarks')
})

export const NewLeaveSchema = yup.object().shape({
  projects: yup.array().of(
    yup.object().shape({
      project_name: SelectSchema,
      project_leader: SelectSchema
    })
  ),
  leave_type: SelectSchema,
  leave_date: yup.array().of(
    yup
      .object()
      .shape({
        date: yup.string().required(),
        number_of_days_in_leave: SelectSchema,
        is_with_pay: yup.boolean().default(false)
      })
      .label('Leave Date')
  ),
  manager: SelectSchema,
  reason: yup.string().required().label('Reason')
})

export const UndertimeLeaveSchema = yup.object().shape({
  projects: yup.array().of(
    yup.object().shape({
      project_name: SelectSchema,
      project_leader: SelectSchema
    })
  ),
  other_project: yup.string().label('Other Project'),
  undertime_leave_date: yup.string().required().label('Leave Date'),
  number_of_days_in_leave_undertime: SelectSchema.label('Number of days in leave (undertime)'),
  manager: SelectSchema.label('Manager'),
  reason: yup.string().required().label('Reason')
})

export const MyOvertimeSchema = yup.object().shape({
  projects: yup.array().of(
    yup.object().shape({
      project_name: SelectSchema,
      project_leader: SelectSchema
    })
  ),
  manager: SelectSchema.label('Manager'),
  date_effective: yup.string().required().label('Date Effective'),
  requested_minutes: yup.number().required().label('Requested minutes'),
  remarks: yup.string().required().label('Reason')
})

export const NewEmployeeSchema = yup.object().shape({
  email: yup.string().required().label('Email'),
  position: yup.string().required().label('Position'),
  first_name: yup.string().required().label('First Name'),
  middle_name: yup.string().label('Middle Name'),
  last_name: yup.string().required().label('Last Name')
})

export const ApproveConfirmationSchema = yup.object().shape({
  requested_minutes: yup
    .number()
    .required('Minutes is required')
    .label('Minutes')
    .typeError('Minutes must be a number'),
  managerRemarks: yup.string().required('Remarks is required').label('Remarks')
})

export const DisapproveConfirmationSchema = ApproveConfirmationSchema.omit(['requested_minutes'])

const fileSchema = yup
  .mixed()
  .required('Please select an image file')
  .test(
    'sizeLimit',
    'The selected file is too large',
    (value: FileList) => value !== null && value !== undefined && value[0]?.size <= 5000000 // 5 MB
  )
  .test(
    'imageFormat',
    'Only image files are allowed',
    (value: FileList) =>
      value !== null &&
      value !== undefined &&
      ['image/jpeg', 'image/png', 'image/gif'].includes(value[0]?.type)
  )

export const FirstDayOnBoardingSchema = yup.object().shape({
  install_below: yup.object().shape({
    docker_toolbox: yup
      .boolean()
      .required()
      .default(true)
      .oneOf([true], 'You must install docker toolbox'),
    vscode: yup.boolean().required().default(true).oneOf([true], 'You must install vscode'),
    mysql_workbench: yup
      .boolean()
      .required()
      .default(true)
      .oneOf([true], 'You must install mysql workbench'),
    docker_for_windows: yup
      .boolean()
      .required()
      .default(true)
      .oneOf([true], 'You must install docker for windows')
  }),
  github_account_link: yup.string().required().label('Github account link'),
  ss_auth_for_email_image: fileSchema,
  ss_auth_for_github_image: fileSchema,
  signature_for_company_id_image: fileSchema,
  picture_2x2_company_id: fileSchema,
  is_signing_probationary_contract: yup.boolean().required().label('Signing probationary contract'),
  is_existing_sss_loan: yup.boolean().required().label('Existing SSS loan'),
  is_existing_pag_ibig_loan: yup.boolean().required().label('Existing Pag-ibig Loan'),
  monthly_amortization_for_sss_loan: yup.string().label('Monthly amortization for sss loan'),
  monthly_amortization_for_pag_ibig_loan: yup
    .string()
    .label('Monthly amortization for pag-ibig loan')
})

export const PersonalInformationSchema = yup.object().shape({
  first_name: yup.string().required().label('First Name'),
  middle_name: yup.string().label('Middle Name'),
  last_name: yup.string().required().label('Last Name'),
  position: yup.string().required().label('Position'),
  sss_number: yup
    .string()
    .matches(/^[0-9-]*$/)
    .label('SSS number (XX-XXXXXXX-X)'),
  tin_number: yup
    .string()
    .matches(/^[0-9-]*$/)
    .label('TIN Number (XXX-XXX-XXX-XXX)'),
  philhealth_number: yup
    .string()
    .matches(/^[0-9-]*$/)
    .label('PhilHealth Number (XX-XXXXXXXXX-X)'),
  pagibig_number: yup
    .string()
    .matches(/^[0-9-]*$/)
    .label('PAG-IBIG (HDMF) Number (XXXX-XXXX-XXXX)'),
  birthday: yup.string().required().label('Birthday'),
  educational_background: yup
    .string()
    .label('Educational Background (University / Major / Course)'),
  contact_number: yup.number().required().label('Contact Number (XXXX-XXX-XXXX)'),
  mobile_carrier: yup.string().required().label('Mobile Carrier'),
  address: yup.string().required().label('Address w/ postal code (....., XXXX)'),
  email: yup.string().required().label('E-mail address for google documents / calendar'),
  chatwork_account: yup.string().required().label('Chatwork/Slack Account'),
  name_incase_of_emergency: yup.string().label('Name'),
  relationship_incase_of_emergency: yup.string().label('Relationship'),
  address_incase_of_emergency: yup.string().label('Address w/ postal code (....., XXXX)'),
  contact_incase_of_emergency: yup.number().label('Contact Number (+XX-XXX-XXX-XXXX)')
})

export const ScheduleSchema = yup.object().shape({
  scheduleName: yup.string().required('Schedule Name is required'),
  monday: yup.object().when('mondaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  }),
  tuesday: yup.object().when('tuesdaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  }),
  wednesday: yup.object().when('wednesdaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  }),
  thursday: yup.object().when('thursdaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  }),
  friday: yup.object().when('fridaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  }),
  saturday: yup.object().when('saturdaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  }),
  sunday: yup.object().when('sundaySelected', {
    is: true,
    then: yup.object().shape({
      timeIn: yup.string().required('Time In is required'),
      timeOut: yup.string().required('Time Out is required'),
      breakFrom: yup.string().required('Break From is required'),
      breakTo: yup.string().required('Break To is required')
    }),
    otherwise: yup.object().shape({
      timeIn: yup.string(),
      timeOut: yup.string(),
      breakFrom: yup.string(),
      breakTo: yup.string()
    })
  })
})

export const ATMApplicationSchema = yup.object().shape({
  last_name: yup.string().required().label('Last Name'),
  first_name: yup.string().required().label('First Name'),
  middle_name: yup.string().label('Middle Name'),
  mother_maiden_name: yup.string().required().label(`Mother's Maiden Name`),
  marital_status: yup.string().required().label('Marital Status'),
  gender: yup.string().required().label('Gender'),
  permanent_address: yup.string().required().label('Permanent Address'),
  city_municipality_province: yup.string().required().label('City / Municipality / Province'),
  zipcode: yup
    .string()
    .matches(/^[0-9]{4}$/, 'Zip code must be 4 digits')
    .required()
    .label('Zip Code'),
  contact_number: yup
    .string()
    .matches(/^[0-9]{12}$/, 'Contact Number must be 12 digits')
    .required()
    .label('Contact Number'),
  birth_place: yup.string().required().label('Birth Place'),
  birthday: yup.string().required().label('Birthday'),
  position: yup.string().required().label('Position'),
  tin_number: yup
    .string()
    .matches(/^[0-9-]*$/)
    .label('TIN Number (XXX-XXX-XXX-XXX)'),
  sss_number: yup
    .string()
    .matches(/^[0-9-]*$/)
    .label('SSS number (XX-XXXXXXX-X)')
})

export const LaptopMonitoringSchema = yup.object().shape({
  laptop_owner: yup.string().required().label('Laptop Owner'),
  laptop_brand: yup.string().required().label('Laptop Brand'),
  laptop_model: yup.string().required().label('Laptop Model'),
  laptop_serial_number: yup.string().required().label('Laptop Serial Number'),
  laptop_company_tag: yup.string().required().label('Laptop Company Tag'),
  laptop_issue_date: yup.string().required().label('Laptop Issue Date'),
  laptop_condition: yup.string().required().label('Laptop Condition'),
  laptop_issues: yup.string().required().label('Laptop Issue'),
  laptop_issues_list: yup.string().required().label('Laptop Issues'),
  laptop_os: yup.string().required().label('Laptop OS'),
  laptop_ram: yup.string().required().label('Laptop Ram'),
  laptop_processor: yup.string().required().label('Laptop Processor'),
  laptop_video_memory: yup.string().required().label('Laptop Video Memory'),
  other_note: yup.string().label('Other Note')
})

export const NewOffsetSchema = yup.object().shape({
  offsetTime: yup.object().shape({
    timeIn: yup.string().required().label('Time in'),
    timeOut: yup.string().required().label('Time out')
  }),
  teamLeader: SelectSchema,
  offsetDates: yup
    .array()
    .min(1, 'At least one date must be selected')
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
    )
    .required('Offset Date is required'),
  remarks: yup.string().required().label('Remarks')
})

export const FileOffsetSchema = yup.object().shape({
  offsetTime: yup.object().shape({
    timeIn: yup.string().required().label('Time in'),
    timeOut: yup.string().required().label('Time out')
  }),
  title: yup.string().required().label('Title'),
  teamLeader: SelectSchema,
  remarks: yup.string().required().label('Remarks')
})

export const changeShiftRequestSchema = yup.object().shape({
  projects: yup.array().of(
    yup.object().shape({
      project_name: SelectSchema,
      project_leader: SelectSchema
    })
  ),
  manager: SelectSchema.label('Manager'),
  requested_time_in: yup.string().required().label('Time In'),
  requested_time_out: yup.string().required().label('Time Out'),
  remarks: yup.string().required().label('Reason')
})

export const AddScheduleMemberSchema = yup.object().shape({
  members: yup
    .array()
    .min(1, 'At least one member must be selected')
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
    )
    .required('Member is required')
})

export const ReassignScheduleSchema = yup.object().shape({
  schedule: SelectSchema.label('Schedule')
})

export const RequestNewScheduleSchema = ScheduleSchema.omit(['scheduleName'])

export const ApplyToAllSchema = yup.object().shape({
  timeIn: yup.string().required('Time In is required'),
  timeOut: yup.string().required('Time Out is required'),
  breakFrom: yup.string().required('Break From is required'),
  breakTo: yup.string().required('Break To is required')
})
