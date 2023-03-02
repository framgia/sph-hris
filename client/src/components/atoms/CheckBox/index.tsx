import React, { FC } from 'react'
import classNames from 'classnames'

type Props = {
  label: string
  isChecked?: boolean
  hasLinks?: boolean
  link?: string
}

const CheckBox: FC<Props> = ({ label, isChecked, hasLinks, link, ...rest }): JSX.Element => {
  return (
    <label htmlFor={label} className="flex items-start">
      <input
        type="checkbox"
        id={label}
        {...rest}
        className={classNames(
          'h-4 w-4 rounded border-slate-300 bg-slate-100',
          'text-primary focus:ring-primary'
        )}
        defaultChecked={isChecked}
      />
      <div className="ml-2 flex flex-wrap items-center space-x-2 text-xs capitalize">
        <span className="select-none text-slate-500">{label}</span>
        {hasLinks === true && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={classNames(
              'text-sky-500 underline decoration-sky-500',
              'line-clamp-1 hover:text-sky-600 hover:no-underline'
            )}
          >
            {link}
          </a>
        )}
      </div>
    </label>
  )
}

CheckBox.defaultProps = {
  label: '',
  isChecked: false,
  hasLinks: false
}

export default CheckBox
