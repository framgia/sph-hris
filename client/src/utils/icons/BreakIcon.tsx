import React, { FC } from 'react'

type Props = {
  className?: string
}

const BreakIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="17" fill="#F59E0B" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 29C23.6274 29 29 23.6274 29 17C29 10.3726 23.6274 5 17 5C10.3726 5 5 10.3726 5 17C5 23.6274 10.3726 29 17 29ZM12.5 15.5C11.6716 15.5 11 16.1716 11 17C11 17.8284 11.6716 18.5 12.5 18.5H21.5C22.3284 18.5 23 17.8284 23 17C23 16.1716 22.3284 15.5 21.5 15.5H12.5Z"
        fill="#F8FAFC"
      />
    </svg>
  )
}

export default BreakIcon
