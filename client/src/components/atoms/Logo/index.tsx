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
        'flex items-center py-5 text-2xl font-bold',
        'space-x-2 font-inter outline-none duration-300',
        isOpen ? 'px-7' : 'px-3'
      )}
    >
      <Text
        theme="md"
        weight="bold"
        className="bg-gradient-to-r from-amber-500 to-fuchsia-500 bg-clip-text text-transparent"
      >
        Sun*
      </Text>
      <Text theme="md" weight="bold" className={classNames('duration-200', !isOpen && 'hidden')}>
        HRIS
      </Text>
    </Link>
  )
}

export default Logo
