import cn from 'classnames'
import type { ReactNode } from 'react'

import { Modal } from '@/shared/ui'
import { ApplicationInfo, type ApplicationInfoType } from '@/entities/application'

import classes from './ApplicationInfoModal.module.scss'

type Slots = {
  top?: ReactNode
  bottom: ReactNode
}

type ApplicationInfoModalProps = {
  title: string | ReactNode
  application: ApplicationInfoType
  slots: Slots
  grayBox?: boolean
  open: boolean
  onClose: () => void
}

export const ApplicationInfoModal = ({
  title,
  application,
  slots,
  grayBox,
  open,
  onClose
}: ApplicationInfoModalProps) => {
  return (
    <Modal title={title} open={open} onClose={onClose} className={classes.applicationInfoModal}>
      <>
        <div
          className={cn(classes.info, {
            [classes.grayBox]: grayBox
          })}
        >
          <ApplicationInfo
            application={application}
            slots={{
              top: slots.top,
              bottom: (
                <div className={classes.comment}>
                  <p className={classes.label}>Comment</p>

                  <p>{application.comment}</p>
                </div>
              )
            }}
          />
        </div>

        <div className={classes.bottom}>{slots.bottom}</div>
      </>
    </Modal>
  )
}
