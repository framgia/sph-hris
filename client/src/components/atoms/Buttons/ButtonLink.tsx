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
      default:
        return href
    }
  }

  return (
    <Link
      href={generateHref(href)}
      className={classNames(
        'relative flex items-center transition duration-75 ease-in-out',
        'w-full outline-none hover:bg-slate-100 hover:text-slate-700',
        router.pathname.includes(href) && href !== '/'
          ? 'font-medium text-slate-800'
          : 'subpixel-antialiased',
        router.pathname === href ? 'font-medium text-slate-800' : 'subpixel-antialiased'
      )}
    >
      <span
        className={classNames(
          'absolute inset-y-0 border-r-[4px]',
          router.pathname === href ? 'rounded-r-lg border-slate-600' : 'border-transparent'
        )}
      />
      <div className="flex w-full items-center space-x-3 py-1.5 pr-8 pl-7">
        <Icon className="h-5 w-5 shrink-0 stroke-0.5" />
        <span className={`${isOpenSidebar ? 'line-clamp-1' : 'hidden'} select-none duration-300`}>
          {name}
        </span>
      </div>
    </Link>
  )
}

export default ButtonLink
