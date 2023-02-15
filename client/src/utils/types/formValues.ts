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
    number_of_days_in_leave: string
    is_with_pay: boolean
  }>
  manager: string
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
  project: {
    label: string
    value: string
  }[]
  other_project?: string
  date_effective: string
  requested_hours: number
  remarks: string
}
