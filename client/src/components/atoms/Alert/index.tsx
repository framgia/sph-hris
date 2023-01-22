import React, { FC } from 'react'
import classNames from 'classnames'
import { X, AlertCircle, Info, Check } from 'react-feather'

type Props = {
  message?: string
  type?: string
}

const Alert: FC<Props> = ({ message, type }): JSX.Element => {
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
        'relative flex items-center justify-center rounded-md border py-2.5 px-4 shadow-md',
        type === 'error' ? 'border-rose-400 bg-rose-50' : '',
        type === 'warning' ? 'border-amber-400 bg-amber-50' : '',
        type === 'info' ? 'border-sky-400 bg-sky-50' : '',
        type === 'success' ? 'border-green-400 bg-green-50' : ''
      )}
    >
      {IconType}
      <p
        className={classNames(
          'text-xs font-medium',
          type === 'error' ? 'text-rose-500' : '',
          type === 'warning' ? 'text-amber-500' : '',
          type === 'info' ? 'text-sky-500' : '',
          type === 'success' ? 'text-green-500' : ''
        )}
      >
        {message}
      </p>
    </div>
  )
}

Alert.defaultProps = {
  type: 'info',
  message: 'Something went wrong'
}

export default Alert
