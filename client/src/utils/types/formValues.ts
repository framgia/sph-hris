export type ConfirmInterruptionValues = {
  work_interruption: number
  power_checkbox: boolean
  specify_reason: string
  time_out: string
  time_in: string
  remarks: string
}

export type TimeEntryFormValues = Required<
  Pick<ConfirmInterruptionValues, 'time_out' | 'time_in' | 'remarks'>
>

export type ReactSelectOption = {
  value: string
  label: string
  __isNew__?: boolean
}

export type NewLeaveFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  projects: {
    project_name: ReactSelectOption
    project_leader: ReactSelectOption
  }[]
  leave_type: ReactSelectOption
  leave_date: Array<{
    date: string
    number_of_days_in_leave: ReactSelectOption
    is_with_pay: boolean
  }>
  manager: ReactSelectOption
  reason: string
}

export type UndertimeFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  projects: {
    project_name: ReactSelectOption
    project_leader: ReactSelectOption
    __isNew__?: boolean
  }[]
  undertime_leave_date: string
  number_of_days_in_leave_undertime: ReactSelectOption
  manager: ReactSelectOption
  reason: string
}

export type NewOvertimeFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  projects: {
    project_name: ReactSelectOption
    project_leader: ReactSelectOption
    __isNew__?: boolean
  }[]
  manager: ReactSelectOption
  date_effective: string
  requested_minutes: number
  remarks: string
}

export type NewEmployeeFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  email: string
  position: string
  first_name: string
  middle_name?: string
  last_name: string
}

export type FirstDayOnBoardingFormValues = {
  install_below: {
    docker_toolbox: boolean
    vscode: boolean
    mysql_workbench: boolean
    docker_for_windows: boolean
  }
  github_account_link: string
  ss_auth_for_email_image: FileList
  ss_auth_for_github_image: FileList
  signature_for_company_id_image: FileList
  picture_2x2_company_id: FileList
  is_signing_probationary_contract: boolean
  is_existing_sss_loan: boolean
  is_existing_pag_ibig_loan: boolean
  monthly_amortization_for_sss_loan: string
  monthly_amortization_for_pag_ibig_loan: string
}

export type PersonalInformationFormValues = {
  first_name: string
  middle_name: string
  last_name: string
  position: string
  sss_number: string
  tin_number: string
  philhealth_number: string
  pagibig_number: string
  birthday: string
  educational_background: string
  contact_number: number
  mobile_carrier: string
  address: string
  email: string
  chatwork_account: string
  name_incase_of_emergency: string
  relationship_incase_of_emergency: string
  address_incase_of_emergency: string
  contact_incase_of_emergency: number
}

export type TimeEntry = {
  timeIn: string
  timeOut: string
}

export type ScheduleFormData = {
  id?: number
  scheduleName: string
  mondaySelected: boolean
  tuesdaySelected: boolean
  wednesdaySelected: boolean
  thursdaySelected: boolean
  fridaySelected: boolean
  saturdaySelected: boolean
  sundaySelected: boolean
  monday: TimeEntry
  tuesday: TimeEntry
  wednesday: TimeEntry
  thursday: TimeEntry
  friday: TimeEntry
  saturday: TimeEntry
  sunday: TimeEntry
}

export type ATMApplicationFormValues = {
  last_name: string
  first_name: string
  middle_name: string
  mother_maiden_name: string
  marital_status: string
  gender: string
  permanent_address: string
  city_municipality_province: string
  zipcode: number
  contact_number: string
  birth_place: string
  birthday: string
  position: string
  tin_number: string
  sss_number: string
}

export type LaptopMonitoringFormValues = {
  laptop_owner: string
  laptop_brand: string
  laptop_model: string
  laptop_serial_number: string
  laptop_company_tag: string
  laptop_issue_date: string
  laptop_condition: string
  laptop_issues: string
  laptop_issues_list: string
  laptop_os: string
  laptop_ram: string
  laptop_processor: string
  laptop_video_memory: string
  other_note: string
}

export type NewOffsetFormValues = {
  offsetTime: TimeEntry
  teamLeader: ReactSelectOption
  offsetDates: ReactSelectOption[]
  remarks: string
}

export type FileOffsetFormValues = {
  offsetTime: TimeEntry
  title: string
  teamLeader: ReactSelectOption
  remarks: string
}

export type changeShiftRequestFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  projects: {
    project_name: ReactSelectOption
    project_leader: ReactSelectOption
    __isNew__?: boolean
  }[]
  manager: ReactSelectOption
  requested_time_in: string
  requested_time_out: string
  remarks: string
}

export type AddScheduleMemberFormValues = {
  members: ReactSelectOption[]
}

export type ReassigneScheduleFormValues = {
  schedule: ReactSelectOption
}
