import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'

import { variants } from '~/utils/constants/animationVariants'

type Props = {
  children: ReactNode
  className: string
}

const Li: FC<Props> = ({ children, className }): JSX.Element => {
  return (
    <motion.li
      {...{
        variants,
        initial: 'initial',
        animate: 'animate',
        exit: 'exit',
        className
      }}
    >
      {children}
    </motion.li>
  )
}

Li.defaultProps = {
  className: ''
}

export default Li
