import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

import Card from './index'

type Props = {
  children: ReactNode
  className?: string
}

const CustomCard: FC<Props> = ({ children, className }): JSX.Element => (
  <Card className={classNames('custom-shadow', className)}>
    <CustomContainerCard>{children}</CustomContainerCard>
  </Card>
)

const CustomContainerCard: FC<Props> = ({ children }): JSX.Element => (
  <div
    className={classNames(
      'className="inline-flex lg:pt-6" w-full flex-col space-y-4 px-4',
      'pb-4 pt-3 sm:px-6 md:px-8 md:pb-6 md:pt-4 lg:px-10 lg:pb-8'
    )}
  >
    {children}
  </div>
)

CustomCard.defaultProps = {
  className: 'border-b-[6px] border-b-primary'
}

export default CustomCard
