import React, { FC } from 'react'
import dynamic from 'next/dynamic'

import { IMenu } from '~/utils/constants/sidebarMenu'
import ButtonLink from '~/components/atoms/Buttons/ButtonLink'

const Tooltip = dynamic(async () => await import('rc-tooltip'), { ssr: false })

type Props = {
  state: {
    isOpenSidebar: boolean
    isOpenSubMenu: boolean
  }
  actions: {
    handleOpenSubMenu: () => void
  }
  item: IMenu
}

const NavItem: FC<Props> = (props): JSX.Element => {
  const {
    item,
    state: { isOpenSidebar, isOpenSubMenu },
    actions: { handleOpenSubMenu }
  } = props

  const { href, name, Icon, submenu } = item

  return (
    <>
      {isOpenSidebar ? (
        // Without Tooltip Default Desktop Sidebar
        <ButtonLink
          {...{
            item: {
              name,
              href,
              Icon,
              submenu
            },
            state: {
              isOpenSidebar,
              isOpenSubMenu
            },
            actions: {
              handleOpenSubMenu
            }
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
                item: {
                  name,
                  href,
                  Icon,
                  submenu
                },
                state: {
                  isOpenSidebar,
                  isOpenSubMenu
                },
                actions: {
                  handleOpenSubMenu
                }
              }}
            />
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default NavItem
