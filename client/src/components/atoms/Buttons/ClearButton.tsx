import { X } from 'react-feather'
import React, { FC } from 'react'
import Tippy from '@tippyjs/react'
import { UseFormSetValue } from 'react-hook-form'

import Button from './Button'
import { RequestNewScheduleFormData, ScheduleFormData } from '~/utils/types/formValues'

type Week =
  | 'mondayClear'
  | 'tuesdayClear'
  | 'wednesdayClear'
  | 'thursdayClear'
  | 'fridayClear'
  | 'saturdayClear'
  | 'sundayClear'

type NewSetValueType = UseFormSetValue<RequestNewScheduleFormData | ScheduleFormData>

type Props = {
  day: Week
  setValue: NewSetValueType
}

const ClearButton: FC<Props> = ({ day, setValue }): JSX.Element => {
  const empty = {
    timeIn: '',
    timeOut: '',
    breakFrom: '',
    breakTo: ''
  }

  const handleClear = (dayClear: Week): void => {
    switch (dayClear) {
      case 'mondayClear':
        setValue('monday', empty)
        break
      case 'tuesdayClear':
        setValue('tuesday', empty)
        break
      case 'wednesdayClear':
        setValue('wednesday', empty)
        break
      case 'thursdayClear':
        setValue('thursday', empty)
        break
      case 'fridayClear':
        setValue('friday', empty)
        break
      case 'saturdayClear':
        setValue('saturday', empty)
        break
      case 'sundayClear':
        setValue('sunday', empty)
        break
      default:
        break
    }
  }

  return (
    <div>
      <Tippy placement="right" content="Clear" className="!text-xs">
        <Button
          type="button"
          onClick={() => handleClear(day)}
          className="mt-3.5 text-slate-500 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </Tippy>
    </div>
  )
}

export default ClearButton
