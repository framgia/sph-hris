import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { ISidebarLink } from '~/utils/interfaces'
import ButtonLink from '~/components/atoms/Buttons/ButtonLink'

const Tooltip = dynamic(async () => await import('rc-tooltip'), { ssr: false })

type Props = {
  isOpen: boolean
  item: ISidebarLink
}

const NavItem: FC<Props> = ({ item, isOpen }): JSX.Element => {
  const { href, name, Icon } = item
  const router = useRouter()

  return (
    <>
      {isOpen ? (
        // Without Tooltip Default Desktop Sidebar
        <ButtonLink
          {...{
            href,
            router,
            name,
            isOpen,
            Icon
          }}
        />
      ) : (
        // With Tooltip When Resize to Mobile
        <Tooltip
          placement="right"
          overlay={name}
          arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        >
          <div>
            <ButtonLink
              {...{
                href,
                router,
                name,
                isOpen,
                Icon
              }}
            />
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default NavItem
