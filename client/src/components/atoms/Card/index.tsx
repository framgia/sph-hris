import { w, W } from 'windstitch'
import { FieldError } from 'react-hook-form'

import { rounded } from '~/utils/windstitchUtils'

const iserror = (value: boolean | FieldError | undefined): string =>
  value === true ? 'border-rose-400 ring-rose-400 shadow-rose-200' : ''

const disabled = (value: boolean): string => (value ? 'cursor-not-allowed opacity-60' : '')

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
    rounded,
    iserror,
    disabled
  },
  defaultVariants: {
    bg: 'white',
    'shadow-size': 'md',
    'shadow-color': 'slate',
    rounded: 'lg',
    border: 'slate',
    iserror: false,
    disabled: false
  }
})

export type CardProps = W.Infer<typeof Card>

export default Card
