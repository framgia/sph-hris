import React, { FC } from 'react'
import classNames from 'classnames'

type Props = {
  label: string
}

const RadioButton: FC<Props> = ({ label, ...rest }): JSX.Element => {
  return (
    <label htmlFor={label} className="flex items-center">
      <input
        type="checkbox"
        id={label}
        {...rest}
        className={classNames(
          'h-4 w-4 rounded border-slate-300 bg-slate-100',
          'text-primary focus:ring-primary'
        )}
      />
      <span className="ml-2 select-none text-xs capitalize text-slate-500">{label}</span>
    </label>
  )
}

RadioButton.defaultProps = {
  label: ''
}

export default RadioButton
