import Tooltip from 'rc-tooltip'
import React, { FC } from 'react'
import { HiFire } from 'react-icons/hi'
import { HelpCircle, RefreshCw, ThumbsDown, Check } from 'react-feather'

type Props = {
  placement?: string
}

const LegendTooltip: FC<Props> = ({ placement }): JSX.Element => {
  return (
    <Tooltip
      placement={placement}
      overlay={
        <div className="flex w-full max-w-[220px] flex-col space-y-2 text-sm text-slate-800">
          <h1 className="font-medium">Legend</h1>
          <ul className="ml-3 space-y-2 text-xs">
            <li className="flex items-start space-x-2">
              <span className="h-4 w-4 shrink-0 rounded-full bg-rose-600"></span>
              <p>Late Time In</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="h-4 w-4 shrink-0 rounded-full bg-purple-600"></span>
              <p>Remarks</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="h-4 w-4 shrink-0 rounded-full bg-amber-500"></span>
              <p>Late Time In With Proof</p>
            </li>
            <li className="flex items-center space-x-2">
              <HiFire className="h-5 w-4 text-red-500" />
              <p>Beyond 8hrs rendered time</p>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="h-4 w-4 rounded bg-green-500 p-0.5 text-white" />
              <p>Approved overtime request</p>
            </li>
            <li className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 rounded bg-amber-500 p-0.5 text-white" />
              <p>Pending overtime request</p>
            </li>
            <li className="flex items-center space-x-2">
              <ThumbsDown className="h-4 w-4 rounded bg-rose-500 p-0.5 text-white" />
              <p>Disapproved overtime request</p>
            </li>
          </ul>
        </div>
      }
      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
    >
      <HelpCircle className="h-5 w-5" />
    </Tooltip>
  )
}

LegendTooltip.defaultProps = {
  placement: 'rightTop'
}

export default LegendTooltip
