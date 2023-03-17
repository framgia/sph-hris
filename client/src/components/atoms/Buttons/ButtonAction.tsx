import { w, W } from 'windstitch'
import classNames from 'classnames'

import { rounded, scale, shadow } from '~/utils/windstitchUtils'

const Button = w.button(
  classNames(
    'outline-none disabled:opacity-50 disabled:cursor-not-allowed',
    'transition duration-75 ease-in-out disabled:active:scale-100',
    'disabled:hover:bg-none'
  ),
  {
    variants: {
      variant: {
        primary: classNames(
          'bg-primary text-white border border-dark-primary',
          'hover:bg-primary/80 shadow-dark-primary/40'
        ),
        success: classNames(
          'bg-green-500 text-white border border-green-600',
          'hover:bg-green-500/80 shadow-green-300'
        ),
        secondary: classNames(
          'bg-slate-50 border border-slate-300 hover:border-slate-400  text-slate-600',
          'hover:bg-slate-100 hover:text-slate-800 shadow-slate-200',
          'shadow-slate-300 hover:text-slate-700'
        ),
        danger: 'bg-rose-500 text-white border border-rose-600 hover:bg-rose-600 shadow-rose-300',
        warning:
          'bg-amber-500 text-white border border-amber-600 hover:bg-amber-600 shadow-amber-300',
        info: 'bg-sky-500 text-white border border-sky-600 hover:bg-sky-600 shadow-sky-300',
        dark: 'bg-slate-500 text-slate-100 border border-slate-600 hover:bg-slate-600 shadow-slate-300',
        'primary-outline': classNames(
          'text-primary bg-white border border-primary shadow-dark-primary/20',
          'hover:border-dark-primary hover:text-dark-primary'
        ),
        'success-outline': classNames(
          'text-green-500 bg-white border border-green-600 hover:border-green-700',
          'hover:text-green-600 shadow-green-200'
        ),
        'secondary-outline': classNames(
          'bg-white border border-slate-400 hover:border-slate-500',
          'hover:text-slate-800 text-slate-600 shadow-slate-200'
        ),
        'danger-outline': classNames(
          'text-rose-500 bg-white border border-rose-600 hover:border-rose-700',
          'hover:text-rose-700  shadow-rose-200'
        ),
        'warning-outline': classNames(
          'text-amber-500 bg-white border border-amber-600 hover:text-amber-600',
          'hover:border-amber-700  shadow-amber-200'
        ),
        'info-outline': classNames(
          'text-sky-500 bg-white border border-slate-300 hover:text-sky-600',
          'hover:border-sky-600  shadow-sky-200'
        ),
        'dark-outline': classNames(
          'text-slate-500 bg-slate-100 border border-slate-600 hover:text-slate-600',
          'hover:border-slate-700  shadow-slate-200'
        )
      },
      scale,
      rounded,
      shadow
    },
    defaultVariants: {
      scale: '95',
      rounded: 'default',
      variant: 'secondary',
      shadow: 'none'
    }
  }
)

export type ButtonProps = W.Infer<typeof Button>

export default Button
