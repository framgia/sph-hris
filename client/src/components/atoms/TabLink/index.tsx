import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from 'react-feather'
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
        'flex select-none items-center space-x-2 border-b-[3px] border-transparent py-2.5 focus:outline-none',
        router.pathname.includes(href)
          ? 'border-amber-500 font-medium text-amber-500'
          : 'font-normal text-slate-500 focus:border-slate-300 hover:border-slate-300 hover:text-slate-600'
      )}
    >
      <Icon
        className={classNames('h-4 w-4 shrink-0', router.pathname !== href ? 'stroke-1' : '')}
      />
      <span className="flex-shrink-0">{name}</span>
    </Link>
  )
}

TabLink.defaultProps = {
  href: '/',
  name: 'Home',
  Icon: Table
}

export default TabLink
