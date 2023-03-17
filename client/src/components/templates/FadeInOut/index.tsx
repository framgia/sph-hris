import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  duration?: number
  delay?: number
  className?: string
  children: React.ReactNode
}

const FadeInOut: React.FC<Props> = ({ duration, delay, className, children }): JSX.Element => {
  const fadeInOutVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay } },
    exit: { opacity: 0, transition: { duration } }
  }

  return (
    <motion.div
      {...{
        initial: 'hidden',
        animate: 'visible',
        exit: 'exit',
        variants: fadeInOutVariants,
        className
      }}
    >
      {children}
    </motion.div>
  )
}

FadeInOut.defaultProps = {
  duration: 0.2,
  delay: 0.1,
  className: ''
}

export default FadeInOut
