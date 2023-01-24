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
