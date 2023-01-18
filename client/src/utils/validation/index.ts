import * as Yup from 'yup'

export const ConfirmInterruptionSchema = Yup.object().shape({
  work_interruption: Yup.string().required().label('Work Interruption'),
  specify_reason: Yup.string().required().label('Specify Reason'),
  time_out: Yup.string().required().label('Time Out'),
  time_in: Yup.string().required().label('Time In'),
  remarks: Yup.string().label('Remarks')
})
