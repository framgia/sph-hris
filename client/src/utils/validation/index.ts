import * as Yup from 'yup'

import { WorkInterruptionType } from './../constants/work-status'

export const ConfirmInterruptionSchema = Yup.object().shape({
  work_interruption: Yup.string().required().label('Work Interruption'),
  specify_reason: Yup.string()
    .nullable(true)
    .label('Specify Reason')
    .when('work_interruption', (workInterruption, schema) => {
      return Number(workInterruption) === Number(WorkInterruptionType.OTHERS)
        ? schema.required()
        : schema
    }),
  time_out: Yup.string().required().label('Time out'),
  time_in: Yup.string().required().label('Time in'),
  remarks: Yup.string().label('Remarks')
})

export const TimeEntrySchema = Yup.object().shape({
  time_out: Yup.string().required().label('Time out'),
  time_in: Yup.string().required().label('Time in'),
  remarks: Yup.string().label('Remarks')
})

export const NewLeaveSchema = Yup.object().shape({
  project: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  ),
  other_project: Yup.string().label('Other Project'),
  leave_type: Yup.string().required().label('Leave Type'),
  leave_date: Yup.array().of(
    Yup.object()
      .shape({
        date: Yup.string().required(),
        number_of_days_in_leave: Yup.string().required(),
        is_with_pay: Yup.boolean().default(false)
      })
      .label('Leave Date')
  ),
  manager: Yup.string().required().label('Manager'),
  project_leader: Yup.string().required().label('Project leader'),
  reason: Yup.string().required().label('Reason')
})

export const UndertimeLeaveSchema = Yup.object().shape({
  project: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  ),
  other_project: Yup.string().label('Other Project'),
  leave_date: Yup.string().required().label('Leave Date'),
  number_of_days_in_leave_undertime: Yup.string()
    .required()
    .label('Number of days in leave (undertime)'),
  reason: Yup.string().required().label('Reason')
})
