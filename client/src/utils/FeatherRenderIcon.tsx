import React, { FC } from 'react'
import * as Icons from 'react-feather'

export type IconName = keyof typeof Icons

export type IconProps = {
  name: IconName
} & Icons.IconProps

const RenderIcon: FC<IconProps> = ({ name, ...rest }) => {
  const IconComponent = Icons[name]
  return <IconComponent {...rest} />
}

export default RenderIcon
