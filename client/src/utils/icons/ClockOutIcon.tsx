import React, { FC } from 'react'

type Props = {
  className?: string
}

const ClockOutIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="17" fill="#FB7185" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 29C23.6274 29 29 23.6274 29 17C29 10.3726 23.6274 5 17 5C10.3726 5 5 10.3726 5 17C5 23.6274 10.3726 29 17 29ZM14 12.5C13.1716 12.5 12.5 13.1716 12.5 14V20C12.5 20.8284 13.1716 21.5 14 21.5H20C20.8284 21.5 21.5 20.8284 21.5 20V14C21.5 13.1716 20.8284 12.5 20 12.5H14Z"
        fill="#F8FAFC"
      />
    </svg>
  )
}

export default ClockOutIcon
