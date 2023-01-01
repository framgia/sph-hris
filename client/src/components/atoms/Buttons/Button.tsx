import { w, W } from 'windstitch'

import { rounded, scale } from '~/utils/windstitchUtils'

const Button = w.button('outline-none', {
  variants: {
    position: {
      right: 'text-right',
      center: 'text-center',
      left: 'text-left'
    },
    scale,
    rounded
  },
  defaultVariants: {
    scale: '95',
    position: 'center',
    rounded: 'default'
  }
})

export type ButtonProps = W.Infer<typeof Button>

export default Button
