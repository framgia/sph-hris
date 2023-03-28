import classNames from 'classnames'
import React, { FC } from 'react'

type Props = {
  isOpenSidebar: boolean
}

const SkeletonNavList: FC<Props> = ({ isOpenSidebar }): JSX.Element => {
  return (
    <div className={classNames('space-y-6 py-1.5', !isOpenSidebar ? 'px-5' : 'px-7')}>
      <div className="animate-pulse">
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div
        className="animate-pulse"
        style={{ animationFillMode: 'backwards', animationDelay: '150ms' }}
      >
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div className="animate-pulse">
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div
        className="animate-pulse"
        style={{ animationFillMode: 'backwards', animationDelay: '200ms' }}
      >
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div className="animate-pulse">
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div
        className="animate-pulse"
        style={{ animationFillMode: 'backwards', animationDelay: '250ms' }}
      >
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div className="animate-pulse">
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
      <div
        className="animate-pulse"
        style={{ animationFillMode: 'backwards', animationDelay: '300ms' }}
      >
        <SkeletonLine
          {...{
            isOpenSidebar
          }}
        />
      </div>
    </div>
  )
}

const SkeletonLine = ({ isOpenSidebar }: { isOpenSidebar: boolean }): JSX.Element => {
  return (
    <div className="w-full space-y-3">
      {isOpenSidebar && <div className="h-4 w-[60%] rounded bg-slate-200/70"></div>}
      <div
        className={classNames(
          'bg-slate-200/70',
          isOpenSidebar ? 'h-3 rounded ' : 'h-3.5 rounded-full '
        )}
      ></div>
    </div>
  )
}

export default SkeletonNavList
