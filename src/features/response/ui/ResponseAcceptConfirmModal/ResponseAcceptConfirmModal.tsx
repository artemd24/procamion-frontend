import { Button, Modal } from '@/shared/ui'

import classes from './ResponseAcceptConfirmModal.module.scss'

type ResponseAcceptConfirmModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ResponseAcceptConfirmModal = ({
  open,
  onClose,
  onConfirm
}: ResponseAcceptConfirmModalProps) => {
  return (
    <Modal className={classes.modal} title='' noClose open={open} onClose={onClose}>
      <>
        <p className={classes.heading}>Are you sure?</p>

        <p className={classes.text}>
          After choosing this response others will be automatically archived
        </p>

        <div className={classes.actions}>
          <Button color='secondary' size='small' onClick={onClose}>
            Cancel
          </Button>
          <Button color='success' size='small' onClick={onConfirm}>
            Proceed
          </Button>
        </div>
      </>
    </Modal>
  )
}
