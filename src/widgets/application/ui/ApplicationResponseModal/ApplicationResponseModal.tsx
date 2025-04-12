'use client'

import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { ApplicationInfoModal, type ApplicationInfoType } from '@/entities/application'
import { ResponseCreate, ResponseEdit } from '@/features/response'
import { useAuth } from '@/shared/hooks/useAuth'

import classes from './ApplicationResponseModal.module.scss'

type ApplicationResponseModalProps = {
  type: 'Cargo' | 'Route'
  application: ApplicationInfoType
  isResponseDisabled: boolean
  open: boolean
  onClose: () => void
}

export const ApplicationResponseModal = ({
  type,
  application,
  isResponseDisabled,
  open,
  onClose
}: ApplicationResponseModalProps) => {
  const { isAuth } = useAuth()
  const [creatingResponseInProcess, setCreatingResponseInProcess] = useState(false)

  return (
    <ApplicationInfoModal
      open={open}
      application={application}
      title={!creatingResponseInProcess ? type : 'Add comment to your response'}
      grayBox={creatingResponseInProcess}
      slots={{
        top: creatingResponseInProcess ? (
          <div className={classes.infoTop}>
            <Typography fontSize={18} fontWeight={700}>
              {type}
            </Typography>
          </div>
        ) : null,
        bottom:
          !isResponseDisabled && isAuth ? (
            <ResponseCreate
              applicationId={application.id}
              onProcessStart={() => {
                setCreatingResponseInProcess(true)
              }}
              onResponseCreate={() => {
                setCreatingResponseInProcess(false)
                onClose()
              }}
            />
          ) : // <ResponseEdit responseId={responseId} comment='test comment' onResponseEdit={() => {}} />
          null
      }}
      onClose={onClose}
    />
  )
}
