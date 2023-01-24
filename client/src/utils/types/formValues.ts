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
