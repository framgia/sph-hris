import React from 'react'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'

import Button from './Button'

type Props = {
  day: string
  selected: boolean
  onClick: () => void
  title: string
  disabled?: boolean
}

const DayButton: React.FC<Props> = ({ day, selected, onClick, title, disabled }): JSX.Element => {
  return (
    <Tippy placement="bottom" content={title} className="!text-xs">
      <Button
        type="button"
        rounded="none"
        onClick={onClick}
        disabled={disabled}
        className={classNames(
          'h-12 w-12 shrink-0 select-none',
          'rounded-full border focus:outline-none',
          selected ? 'border-amber-500 bg-[#FFF2E9] text-amber-500' : 'border-slate-300'
        )}
      >
        {day}
      </Button>
    </Tippy>
  )
}

DayButton.defaultProps = {
  disabled: false
}

export default DayButton
