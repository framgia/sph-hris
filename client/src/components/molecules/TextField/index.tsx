import classNames from 'classnames'
import { Coffee } from 'react-feather'
import React, { FC, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  title: string
  Icon?: any
  children: ReactNode
  isRequired?: boolean
  className?: string
  isError?: FieldError | boolean | undefined
  isOptional?: boolean
  optionalText?: string | undefined
}

const TextField: FC<Props> = (props): JSX.Element => {
  const { title, Icon, children, isRequired, className, isError, isOptional, optionalText } = props

  return (
    <label className={classNames('group space-y-0.5', className)}>
      {title} {isRequired === true ? <span className="text-rose-500">*</span> : ''}{' '}
      {isOptional === true ? <small className="italic text-slate-500">({optionalText})</small> : ''}
      <div className="relative flex items-center">
        <div
          className={classNames(
            'absolute inset-y-0 flex items-center border-r border-slate-300',
            'px-2 group-focus-within:border-r-2',
            'transition duration-150 ease-in-out',
            isError === true
              ? 'group-focus-within:border-rose-500'
              : 'group-focus-within:border-primary'
          )}
        >
          <Icon
            className={classNames(
              'h-5 w-5 stroke-1',
              isError === true
                ? 'text-rose-400 group-focus-within:text-rose-500'
                : 'text-slate-400 group-focus-within:text-primary'
            )}
          />
        </div>
        {children}
      </div>
    </label>
  )
}

TextField.defaultProps = {
  title: '',
  Icon: Coffee,
  isRequired: false,
  className: '',
  isError: false,
  isOptional: false,
  optionalText: 'if others'
}

export default TextField
