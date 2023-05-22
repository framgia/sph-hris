import React, { FC } from 'react'
import classNames from 'classnames'
import { X, AlertCircle, Info, Check } from 'react-feather'

type Props = {
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  className?: string
}

const Alert: FC<Props> = ({ message, type, className }): JSX.Element => {
  let containerStyle = ''
  let textStyle = ''

  switch (type) {
    case 'success':
      containerStyle = 'border-green-400 bg-green-50'
      textStyle = 'text-green-500'
      break
    case 'error':
      containerStyle = 'border-rose-400 bg-rose-50'
      textStyle = 'text-rose-500'
      break
    case 'warning':
      containerStyle = 'border-amber-400 bg-amber-50'
      textStyle = 'text-amber-500'
      break
    case 'info':
      containerStyle = 'border-sky-400 bg-sky-50'
      textStyle = 'text-sky-500'
      break
    default:
      containerStyle = 'border-sky-400 bg-sky-50'
      textStyle = 'text-sky-500'
  }

  const IconType = (
    <>
      {type === 'error' && (
        <X className="absolute left-4 h-4 w-4 rounded-full bg-rose-500 p-0.5 text-white" />
      )}
      {type === 'warning' && (
        <AlertCircle className="absolute left-4 h-4 w-4 rounded-full bg-amber-500 p-0.5 text-white" />
      )}
      {type === 'info' && (
        <Info className="absolute left-4 h-4 w-4 rounded-full bg-sky-500 p-0.5 text-white" />
      )}
      {type === 'success' && (
        <Check className="absolute left-4 h-4 w-4 rounded-full bg-green-500 p-0.5 text-white" />
      )}
    </>
  )

  return (
    <div
      className={classNames(
        'relative flex justify-center',
        'rounded-md border py-2.5 px-4 shadow-md shadow-slate-200',
        containerStyle,
        className
      )}
    >
      <span>{IconType}</span>
      <p className={classNames('pl-6 text-xs font-medium', textStyle)}>{message}</p>
    </div>
  )
}

Alert.defaultProps = {
  type: 'info',
  message: 'Something went wrong',
  className: ''
}

export default Alert
