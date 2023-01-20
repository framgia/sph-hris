import classNames from 'classnames'
import { Search } from 'react-feather'
import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react'

type Props = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const GlobalSearchFilter: FC<Props> = (props): JSX.Element => {
  const { className, value: initialValue, onChange, debounce = 500, ...rest } = props

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className={classNames('group flex items-center space-x-2', className)}>
      <Search className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500" />
      <input
        type="text"
        className={classNames(
          'h-8 w-full border-x-0 border-b border-t-0 border-slate-300 bg-transparent',
          'px-0 text-sm font-normal placeholder:font-light placeholder:text-slate-400',
          'focus:outline-none focus:ring-0 group-focus-within:border-amber-500'
        )}
        {...rest}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
      />
    </div>
  )
}

GlobalSearchFilter.defaultProps = {}

export default GlobalSearchFilter
