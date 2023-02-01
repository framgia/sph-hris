import { w, W } from 'windstitch'
import { FieldError } from 'react-hook-form'

import { rounded } from '~/utils/windstitchUtils'

const iserror = (value: boolean | FieldError | undefined): string =>
  value === true
    ? 'border-rose-500 ring-rose-500 group-focus:border-rose-500 group-focus:ring-rose-500'
    : ''

const Select = w.select(
  `
    outline-none disabled:cursor-not-allowed disabled:opacity-50 
    placeholder:font-light placeholder:text-slate-400
    border border-slate-300 focus:outline-none w-full
    transition ease-in-out duration-150
  `,
  {
    variants: {
      color: {
        primary: 'focus:border-primary focus:ring-primary',
        success: 'focus:border-green-500 focus:ring-green-500',
        danger: 'focus:border-rose-500 focus:ring-rose-500',
        info: 'focus:border-sky-500 focus:ring-sky-500',
        warning: 'focus:border-amber-500 focus:ring-amber-500'
      },
      iserror,
      rounded
    },
    defaultVariants: {
      rounded: 'default',
      iserror: false,
      color: 'primary'
    }
  }
)

export type SelectProps = W.Infer<typeof Select>

export default Select
