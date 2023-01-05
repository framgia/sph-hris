import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'

import Text from './../Text'

type Props = {
  isOpen?: boolean | undefined
  href?: string
}

const Logo: FC<Props> = ({ isOpen = true, href = '/' }): JSX.Element => {
  return (
    <Link
      href={href}
      className={classNames(
        'flex items-center py-6 text-2xl font-bold',
        'space-x-2 outline-none duration-300',
        isOpen ? 'px-7' : 'px-3'
      )}
    >
      <Text theme="md" color="amber" weight="bold">
        Sun*
      </Text>
      <Text theme="md" weight="bold" className={classNames('duration-200', !isOpen && 'hidden')}>
        HRIS
      </Text>
    </Link>
  )
}

export default Logo
