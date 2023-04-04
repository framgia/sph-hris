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
        <linearGradient id="gradient" x1="30%" y1="4%" x2="70%" y2="96%">
          <stop offset="5%" stopColor="#8ed1fc"></stop>
          <stop offset="95%" stopColor="#8ED1FC"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 C 0,400 0,133 0,133 C 80.53333333333333,132.75384615384615 161.06666666666666,132.50769230769234 234,140 C 306.93333333333334,147.49230769230766 372.26666666666665,162.72307692307692 461,169 C 549.7333333333333,175.27692307692308 661.8666666666668,172.6 754,153 C 846.1333333333332,133.4 918.2666666666667,96.87692307692308 983,96 C 1047.7333333333333,95.12307692307692 1105.0666666666666,129.8923076923077 1180,142 C 1254.9333333333334,154.1076923076923 1347.4666666666667,143.55384615384617 1440,133 C 1440,133 1440,400 1440,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="0.53"
        className="path-0 transition-all delay-150 duration-300 ease-in-out"
      ></path>
      <defs>
        <linearGradient id="gradient" x1="30%" y1="4%" x2="70%" y2="96%">
          <stop offset="5%" stopColor="#8ed1fc"></stop>
          <stop offset="95%" stopColor="#8ED1FC"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 C 0,400 0,266 0,266 C 91.43076923076924,259.73333333333335 182.8615384615385,253.46666666666664 265,248 C 347.1384615384615,242.53333333333336 419.9846153846154,237.86666666666673 503,247 C 586.0153846153846,256.13333333333327 679.1999999999999,279.06666666666666 757,275 C 834.8000000000001,270.93333333333334 897.2153846153847,239.8666666666667 965,242 C 1032.7846153846153,244.1333333333333 1105.9384615384615,279.46666666666664 1186,289 C 1266.0615384615385,298.53333333333336 1353.0307692307692,282.26666666666665 1440,266 C 1440,266 1440,400 1440,400 Z"
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
