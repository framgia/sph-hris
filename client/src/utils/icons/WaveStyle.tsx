import React, { FC } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
}

const WaveStyle: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      id="svg"
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('transition delay-150 duration-300 ease-in-out', className)}
    >
      <defs>
        <linearGradient id="gradient" x1="98%" y1="63%" x2="2%" y2="37%">
          <stop offset="5%" stopColor="#fcd34d"></stop>
          <stop offset="95%" stopColor="#e879f9"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 C 0,400 0,133 0,133 C 151.28571428571428,148.96428571428572 302.57142857142856,164.92857142857142 424,176 C 545.4285714285714,187.07142857142858 637,193.25000000000003 744,175 C 851,156.74999999999997 973.4285714285716,114.07142857142857 1092,103 C 1210.5714285714284,91.92857142857143 1325.2857142857142,112.46428571428572 1440,133 C 1440,133 1440,400 1440,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="0.53"
        className="path-0 ease-inOut transition-all delay-150 duration-300"
      ></path>
      <defs>
        <linearGradient id="gradient" x1="98%" y1="63%" x2="2%" y2="37%">
          <stop offset="5%" stopColor="#fcd34d"></stop>
          <stop offset="95%" stopColor="#e879f9"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 C 0,400 0,266 0,266 C 114,269.92857142857144 228,273.85714285714283 350,272 C 472,270.14285714285717 601.9999999999999,262.5 738,251 C 874.0000000000001,239.50000000000003 1016,224.14285714285714 1134,226 C 1252,227.85714285714286 1346,246.92857142857144 1440,266 C 1440,266 1440,400 1440,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="1"
        className="path-1 transition-all delay-150 duration-300 ease-in-out"
      ></path>
    </svg>
  )
}

export default WaveStyle
