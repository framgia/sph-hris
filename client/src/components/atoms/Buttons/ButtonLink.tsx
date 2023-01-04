import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { NextRouter } from 'next/router'

type Props = {
  href: string
  router: NextRouter
  name: string
  isOpen: boolean
  Icon: any
}

const ButtonLink: FC<Props> = ({ href, router, name, isOpen, Icon }): JSX.Element => {
  return (
    <Link
      href={href}
      className={classNames(
        'relative flex transition duration-75 ease-in-out hover:bg-slate-100 hover:text-slate-700',
        router.asPath === href ? 'font-medium text-slate-800' : 'subpixel-antialiased'
      )}
    >
      <span
        className={classNames(
          'border-r-[4px]',
          router.asPath === href ? 'rounded-r-lg border-slate-600' : 'border-transparent'
        )}
      />
      <div className="flex w-full items-center space-x-3 px-6 py-1.5">
        <Icon
          className={classNames(
            'h-5 w-5 shrink-0 stroke-0.5',
            name === 'My Overtime' && 'fill-current'
          )}
        />
        <span className={`${isOpen ? 'line-clamp-1' : 'hidden'} duration-300`}>{name}</span>
      </div>
    </Link>
  )
}

export default ButtonLink
