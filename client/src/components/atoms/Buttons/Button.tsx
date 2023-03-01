import { w, W } from 'windstitch'
import classNames from 'classnames'

import { rounded, scale } from '~/utils/windstitchUtils'

const Button = w.button(
  classNames(
    'outline-none disabled:cursor-not-allowed',
    'disabled:opacity-50 disabled:active:scale-100'
  ),
  {
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
  }
)

export type ButtonProps = W.Infer<typeof Button>

export default Button
