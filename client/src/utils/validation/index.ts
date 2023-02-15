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
  project: Yup.array(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  )
    .min(1, 'Project is required')
    .required('Project is required'),
  other_project: Yup.string().label('Other Project'),
  leave_type: Yup.object({
    label: Yup.string().required('Leave type is required'),
    value: Yup.string().required('Leave type is required')
  })
    .nullable()
    .required('Leave type is required')
    .label('Leave type'),
  leave_date: Yup.array().of(
    Yup.object()
      .shape({
        date: Yup.string().required(),
        number_of_days_in_leave: Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        }),
        is_with_pay: Yup.boolean().default(false)
      })
      .label('Leave Date')
  ),
  manager: Yup.object({
    label: Yup.string().required('Manager is required'),
    value: Yup.string().required('Manager is required')
  })
    .required('Manager is required')
    .label('Manager'),
  project_leader: Yup.object({
    label: Yup.string().required('Project Leader is required'),
    value: Yup.string().required('Project Leader is required')
  })
    .required('Project Leader is required')
    .label('Project Leader'),
  reason: Yup.string().required().label('Reason')
})

export const UndertimeLeaveSchema = Yup.object().shape({
  project: Yup.array(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  )
    .min(1, 'Project is required')
    .required('Project is required'),
  other_project: Yup.string().label('Other Project'),
  leave_date: Yup.string().required().label('Leave Date'),
  number_of_days_in_leave_undertime: Yup.object({
    label: Yup.string().required('Number of days is required'),
    value: Yup.string().required('Number of days is required')
  })
    .required('Number of days is required')
    .label('Number of days in leave (undertime)'),
  manager: Yup.object({
    label: Yup.string().required('Manager is required'),
    value: Yup.string().required('Manager is required')
  })
    .required('Manager is required')
    .label('Manager'),
  project_leader: Yup.object({
    label: Yup.string().required('Project Leader is required'),
    value: Yup.string().required('Project Leader is required')
  })
    .required('Project Leader is required')
    .label('Project Leader'),
  reason: Yup.string().required().label('Reason')
})
