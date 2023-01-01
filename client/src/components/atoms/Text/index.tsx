import { w, W } from 'windstitch'

const Text = w.p(``, {
  variants: {
    color: {
      amber: 'text-amber-500',
      slate: 'text-slate-800'
    },
    size: {
      sm: 'text-sm',
      base: 'text-base',
      md: 'text-2xl',
      xl: 'text-8xl'
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold'
    },
    theme: {
      h1: '',
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
