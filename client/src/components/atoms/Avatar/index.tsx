import { w, W } from 'windstitch'

import { rounded, scale } from '~/utils/windstitchUtils'

const Avatar = w.img('bg-cover object-cover shrink-0', {
  variants: {
    size: {
      xs: 'w-5 h-5',
      sm: 'w-6 h-6',
      base: 'w-7 h-7',
      md: 'w-8 h-8',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20'
    },
    scale,
    rounded
  },
  defaultVariants: {
    scale: '95',
    size: 'base',
    rounded: 'default'
  }
})

Avatar.displayName = 'Avatar'

export type AvatarProps = W.Infer<typeof Avatar>

export default Avatar
