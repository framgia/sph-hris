import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ChevronRight } from 'react-feather'

import Button from './Button'

type Props = {
  item: {
    name: string
    href: string
    Icon: any
    submenu: boolean | undefined
  }
  state: {
    index: number
    isOpenSidebar: boolean
    openIndexes: number[]
  }
  actions: {
    toggleSubmenu: (index: number) => void
  }
}

const ButtonLink: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const {
    item: { name, href, Icon, submenu },
    state: { index, isOpenSidebar, openIndexes },
    actions: { toggleSubmenu }
  } = props

  return (
    <Link
      href={
        submenu === true && isOpenSidebar
          ? ''
          : href === '/leave-management'
          ? `${href}/list-of-leave`
          : href === '/my-forms'
          ? `${href}/first-day-onboarding`
          : href
      }
      className={classNames(
        'relative flex items-center transition duration-75 ease-in-out',
        'outline-none hover:bg-slate-100 hover:text-slate-700',
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
      {submenu === true && (
        <Button
          className={classNames('group ml-2 mr-4', !isOpenSidebar && 'hidden')}
          onClick={() => toggleSubmenu(index)}
        >
          <ChevronRight
            className={classNames(
              'h-4 w-4 shrink-0 stroke-1 group-hover:stroke-2',
              openIndexes.includes(index) ? 'rotate-90' : ''
            )}
          />
        </Button>
      )}
    </Link>
  )
}

ButtonLink.defaultProps = {}

export default ButtonLink
