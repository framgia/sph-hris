import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'

import { variants } from '~/utils/constants/animationVariants'

type Props = {
  children: ReactNode
  className: string
}

const Tr: FC<Props> = ({ children, className }): JSX.Element => {
  return (
    <motion.tr
      {...{
        variants,
        initial: 'initial',
        animate: 'animate',
        exit: 'exit',
        className
      }}
    >
      {children}
    </motion.tr>
  )
}

Tr.defaultProps = {
  className: ''
}

export default Tr
