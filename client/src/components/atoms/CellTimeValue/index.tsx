import React, { FC } from 'react'
import Tippy from '@tippyjs/react'

type Props = {
  initialMinutes: number
}

const CellTimeValue: FC<Props> = ({ initialMinutes }): JSX.Element => {
  const [hours, minutes] = [Math.floor(initialMinutes / 60), Math.floor(initialMinutes % 60)]

  const hoursTooltip = hours > 0 ? `${hours} ${hours > 1 ? 'hours' : 'hour'}` : ''
  const minuteTooltip = minutes > 0 ? `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}` : ''
  const tooltipContent =
    hours > 0 && minutes > 0
      ? `${hoursTooltip}, ${minuteTooltip}`
      : `${hoursTooltip}${minuteTooltip}`

  return initialMinutes > 0 ? (
    <Tippy placement="left" content={tooltipContent} className="!text-xs">
      <span>{initialMinutes}</span>
    </Tippy>
  ) : (
    <span>{initialMinutes !== undefined ? initialMinutes ?? 0 : 0}</span>
  )
}

export default CellTimeValue
