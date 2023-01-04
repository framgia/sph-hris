import React, { FC } from 'react'

type Props = {
  className?: string
}

const ClockInIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="17" fill="#75C55E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 29C23.6274 29 29 23.6274 29 17C29 10.3726 23.6274 5 17 5C10.3726 5 5 10.3726 5 17C5 23.6274 10.3726 29 17 29ZM16.3321 12.7519C15.8718 12.4451 15.2799 12.4165 14.7922 12.6775C14.3045 12.9385 14 13.4468 14 14V20C14 20.5532 14.3045 21.0615 14.7922 21.3225C15.2799 21.5835 15.8718 21.5549 16.3321 21.2481L20.8321 18.2481C21.2493 17.9699 21.5 17.5015 21.5 17C21.5 16.4985 21.2493 16.0301 20.8321 15.7519L16.3321 12.7519Z"
        fill="#F8FAFC"
      />
    </svg>
  )
}

export default ClockInIcon
