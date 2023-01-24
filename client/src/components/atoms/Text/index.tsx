import { w, W } from 'windstitch'

const Text = w.p(``, {
  variants: {
    color: {
      amber: 'text-amber-500',
      slate: 'text-slate-900'
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      md: 'text-2xl',
      lg: 'text-lg',
      xl: 'text-8xl'
    },
    weight: {
      normal: 'font-normal',
      medium: 'medium',
      bold: 'font-bold',
      semibold: 'font-semibold'
    },
    theme: {
      h1: '',
      lg: '',
      base: '',
      md: '',
      sm: ''
    }
  },
  defaultVariants: {
    variant: 'base',
    weight: 'normal',
    size: 'base',
    color: 'slate'
  },
  compoundVariants: [
    {
      theme: 'h1',
      defaultTo: {
        size: 'xl',
        weight: 'bold'
      }
    },
    {
      theme: 'lg',
      defaultTo: {
        size: 'lg',
        weight: 'normal'
      }
    },
    {
      theme: 'base',
      defaultTo: {
        size: 'base',
        weight: 'normal'
      }
    },
    {
      theme: 'md',
      defaultTo: {
        size: 'md',
        weight: 'normal'
      }
    },
    {
      theme: 'sm',
      defaultTo: {
        size: 'sm',
        weight: 'normal'
      }
    }
  ]
})

export type TextProps = W.Infer<typeof Text>

export default Text
