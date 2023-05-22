import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

type Props = {
  item: {
    name: string
    href: string
    Icon: any
    submenu: boolean | undefined
  }
  state: {
    isOpenSidebar: boolean
  }
}

const ButtonLink: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const {
    item: { name, href, Icon },
    state: { isOpenSidebar }
  } = props

  const generateHref = (href: string): string => {
    switch (true) {
      case href === '/leave-management':
        return `${href}/list-of-leave`
      case href === '/my-forms':
        return `${href}/first-day-onboarding`
      case href === '/my-schedule':
        return `${href}/current-schedule`
      default:
        return href
    }
  }

  const isActive = router.pathname === href

  return (
    <Link
      href={generateHref(href)}
      className={classNames(
        'relative flex items-center transition duration-75 ease-in-out',
        'w-full outline-none hover:bg-slate-100 hover:text-slate-700',
        router.pathname.includes(href) && href !== '/'
          ? 'font-medium text-slate-800'
          : 'subpixel-antialiased',
        isActive ? 'font-medium text-slate-700' : 'subpixel-antialiased'
      )}
    >
      <span
        className={classNames(
          'absolute inset-y-0 border-r-[4px]',
          isActive ? 'rounded-r-lg border-slate-700' : 'border-transparent'
        )}
      />
      <div className="flex w-full items-center space-x-3 py-2 pr-8 pl-7">
        <Icon
          className="shrink-0"
          theme={isActive ? 'filled' : 'outline'}
          size={18}
          strokeWidth="3"
          strokeLinecap="butt"
        />
        <span className={`${isOpenSidebar ? 'line-clamp-1' : 'hidden'} select-none duration-300`}>
          {name}
        </span>
      </div>
    </Link>
  )
}

export default ButtonLink
