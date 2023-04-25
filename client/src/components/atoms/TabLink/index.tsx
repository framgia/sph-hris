import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from 'react-feather'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

type Props = {
  href: string
  name: string
  Icon: any
}

const TabLink: FC<Props> = ({ href, name, Icon }): JSX.Element => {
  const router = useRouter()

  return (
    <Link
      href={href}
      className={classNames(
        'relative flex select-none items-center',
        'border-b-[3px] border-transparent py-2.5 focus:outline-none',
        'transition duration-150 ease-in-out',
        router.pathname.includes(href)
          ? 'font-medium text-amber-500'
          : classNames(
              'font-normal text-slate-500 focus:border-slate-300',
              'hover:border-slate-300 hover:text-slate-600'
            )
      )}
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {router.pathname.includes(href) && (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 -bottom-1 z-10 border-b-[3px] border-amber-500"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Icon
        className={classNames('h-4 w-4 shrink-0', router.pathname !== href ? 'stroke-1' : '')}
      />
      <span className="relative ml-2 flex-shrink-0">{name}</span>
    </Link>
  )
}

TabLink.defaultProps = {
  href: '/',
  name: 'Home',
  Icon: Table
}

export default TabLink
