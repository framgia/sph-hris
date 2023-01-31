import { w, W } from 'windstitch'

import { rounded } from '~/utils/windstitchUtils'

const Card = w.section(``, {
  variants: {
    bg: {
      white: 'bg-white',
      gray: 'bg-gray-50',
      slate: 'bg-slate-50',
      amber: 'bg-slate-50'
    },
    'shadow-size': {
      none: 'shadow-none',
      xs: 'shadow-xs',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl'
    },
    'shadow-color': {
      slate: 'shadow-slate-200',
      gray: 'shadow-slate-200',
      amber: 'shadow-amber-200'
    },
    border: {
      gray: 'border border-gray-200',
      slate: 'border border-slate-200'
    },
    rounded
  },
  defaultVariants: {
    bg: 'white',
    'shadow-size': 'md',
    'shadow-color': 'slate',
    rounded: 'lg',
    border: 'slate'
  }
})

export type CardProps = W.Infer<typeof Card>

export default Card
