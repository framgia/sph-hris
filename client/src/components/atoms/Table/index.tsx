import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'
import { Table } from '@tanstack/react-table'

type Props = {
  children: ReactNode
  table?: Table<any>
  className?: string
}

const AnimatedTable: FC<Props> = ({ children, table: animatedTable, className }): JSX.Element => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } }
  }

  return (
    <motion.table
      {...{
        variants,
        initial: 'initial',
        animate: 'animate'
      }}
      {...{
        style: {
          width: animatedTable?.getCenterTotalSize()
        },
        className
      }}
    >
      {children}
    </motion.table>
  )
}

AnimatedTable.defaultProps = {
  className: 'w-full'
}

export default AnimatedTable
