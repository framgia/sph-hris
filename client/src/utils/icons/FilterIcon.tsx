import React, { FC } from 'react'

type Props = {
  className?: string
}

const FilterIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      viewBox="0 0 15 11"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.773809C0 0.346446 0.346446 0 0.773809 0H14.2262C14.6536 0 15 0.346446 15 0.773809C15 1.20117 14.6536 1.54762 14.2262 1.54762H0.773809C0.346446 1.54762 0 1.20117 0 0.773809ZM2.5 5.41655C2.5 4.98919 2.84645 4.64274 3.27381 4.64274H11.7262C12.1536 4.64274 12.5 4.98919 12.5 5.41655C12.5 5.84391 12.1536 6.19036 11.7262 6.19036H3.27381C2.84645 6.19036 2.5 5.84391 2.5 5.41655ZM5.77381 9.28548C5.34645 9.28548 5 9.63193 5 10.0593C5 10.4867 5.34645 10.8331 5.77381 10.8331H9.22619C9.65355 10.8331 10 10.4867 10 10.0593C10 9.63193 9.65355 9.28548 9.22619 9.28548H5.77381Z"
        fill="current"
      />
    </svg>
  )
}

export default FilterIcon
