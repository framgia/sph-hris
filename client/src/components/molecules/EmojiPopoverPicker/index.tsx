import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Popover } from '@headlessui/react'
import { WinkingFace } from '@icon-park/react'
import data from '@emoji-mart/data/sets/14/facebook.json'

import { Emoji } from '~/utils/types/emoji'
import PopoverTransition from '~/components/templates/PopoverTransition'

const EmojiPicker = dynamic(async () => await import('@emoji-mart/react'), {
  ssr: false
})

type Props = {
  handleEmojiSelect: (emoji: Emoji) => void
  panelPosition?: string
}

const EmojiPopoverPicker: FC<Props> = ({ handleEmojiSelect, panelPosition }): JSX.Element => {
  return (
    <Popover as="div" className="relative text-left">
      {({ open }) => (
        <>
          <Popover.Button
            type="button"
            className={classNames(
              'text-slate-400 outline-none hover:text-slate-500',
              'transition duration-150 ease-in-out',
              open ? '!text-slate-500' : ''
            )}
          >
            <WinkingFace theme="outline" size="22" strokeWidth={2} />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0" />
          <PopoverTransition>
            <Popover.Panel className={classNames('absolute', panelPosition)}>
              <EmojiPicker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

EmojiPopoverPicker.defaultProps = {
  panelPosition: 'right-0'
}

export default EmojiPopoverPicker
