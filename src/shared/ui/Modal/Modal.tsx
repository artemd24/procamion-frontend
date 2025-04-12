'use client'

import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import Image from 'next/image'
import type { ReactNode } from 'react'

import classes from './Modal.module.scss'

type ModalProps = Omit<MuiModalProps, 'title'> & {
  title: string | ReactNode
  noClose?: boolean
  onClose: () => void
}

export const Modal = ({ children, title, className, noClose = false, ...props }: ModalProps) => {
  return (
    <MuiModal
      {...props}
      classes={{
        backdrop: classes.backdrop,
        root: classes.modal
      }}
    >
      <div className={cn(classes.content, className)}>
        {!noClose ? (
          <div className={classes.top}>
            {typeof title === 'string' ? (
              <Typography variant='h4' fontSize={18} fontWeight={700}>
                {title}
              </Typography>
            ) : (
              title
            )}

            <button
              className={classes.closeButton}
              onClick={(e) => {
                props.onClose(e, 'backdropClick')
              }}
            >
              <Image width={24} height={24} src='/icons/cross-circle.svg' alt='close' />
            </button>
          </div>
        ) : null}

        {children}
      </div>
    </MuiModal>
  )
}
