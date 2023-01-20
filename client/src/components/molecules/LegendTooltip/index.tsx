import Tooltip from 'rc-tooltip'
import React, { FC } from 'react'
import { HelpCircle } from 'react-feather'

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
              <p>Represent Late Time In</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="h-4 w-4 shrink-0 rounded-full bg-purple-600"></span>
              <p>Represent Remarks</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="h-4 w-4 shrink-0 rounded-full bg-amber-500"></span>
              <p>Represent With Proof and Late Time In</p>
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
