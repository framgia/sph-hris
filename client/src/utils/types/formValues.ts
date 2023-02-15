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
  label: string
  value: string
}

export type NewLeaveFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  project: ReactSelectOption[]
  other_project?: string
  leave_type: ReactSelectOption
  leave_date: Array<{
    date: string
    number_of_days_in_leave: ReactSelectOption
    is_with_pay: boolean
  }>
  manager: ReactSelectOption
  project_leader: ReactSelectOption
  reason: string
}

export type UndertimeFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  project: {
    label: string
    value: string
  }[]
  other_project?: string
  leave_date: string
  number_of_days_in_leave_undertime: ReactSelectOption
  manager: ReactSelectOption
  project_leader: ReactSelectOption
  reason: string
}
