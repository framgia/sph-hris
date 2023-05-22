import React, { FC } from 'react'
import { AlertTriangle, Save, X } from 'react-feather'

import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'

type Props = {
  isOpen: boolean
  closeModal: () => void
  isSubmitting: boolean
  isSaveTimeOut: Function
}

const ShowEarlyTimeOutModal: FC<Props> = ({
  isOpen,
  closeModal,
  isSubmitting,
  isSaveTimeOut
}): JSX.Element => {
  const handleClick = (): void => {
    isSaveTimeOut()
  }
  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-lg"
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          title: 'Time Out Early',
          Icon: AlertTriangle,
          closeModal
        }}
      />
      {/* Actual Remarks data */}
      <div className="py-7 px-5 text-sm text-slate-800 decoration-orange-400 selection:bg-fuchsia-400">
        You won&apos;t be able to time in again for today if you time out. Proceed?
      </div>

      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={closeModal}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-4 py-1 text-sm"
        >
          <X className="h-4 w-4" />
          <span>Close</span>
        </Button>
        <Button
          type="submit"
          onClick={handleClick}
          variant="success"
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-5 py-1 text-sm"
        >
          {isSubmitting ? (
            <>
              <SpinnerIcon className="h-3 w-3 fill-white" />
              <span>Saving..</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save</span>
            </>
          )}
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

export default ShowEarlyTimeOutModal
