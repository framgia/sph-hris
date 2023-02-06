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

export type NewLeaveFormValues = {
  // eslint-disable-next-line @typescript-eslint/array-type
  project: {
    label: string
    value: string
  }[]
  other_project?: string
  leave_type: string
  leave_date: Array<{
    date: string
    number_of_days_in_leave: string
    is_with_pay: boolean
  }>
  manager: string
  project_leader: string
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
  number_of_days_in_leave_undertime: string
  manager: string
  project_leader: string
  reason: string
}
