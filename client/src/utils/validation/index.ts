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
  project: yup.array().of(
    yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
  ),
  other_project: yup.string().label('Other Project'),
  date_effective: yup.string().required().label('Date Effective'),
  requested_hours: yup.number().required().label('Requested hours'),
  remarks: yup.string().required().label('Reason')
})

export const ApproveConfirmationSchema = yup.object().shape({
  requested_hours: yup.number().required().label('Requested hours')
})
