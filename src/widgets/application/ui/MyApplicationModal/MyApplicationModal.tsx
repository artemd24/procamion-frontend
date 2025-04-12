'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  ApplicationInfoModal,
  ApplicationInfoType,
  ApplicationStatus
} from '@/entities/application'
import { ConfirmWorkDone } from '@/features/application'
import { CargoCreateEditModal, useCargoDelete } from '@/features/cargo'
import { RouteCreateEditModal, useRouteDelete } from '@/features/route'
import { useAppliedReponse } from '@/entities/response'
import { Button } from '@/shared/ui'

import classes from './MyApplicationModal.module.scss'

type MyApplicationModalProps = {
  type: 'Cargo' | 'Route'
  application: ApplicationInfoType
  open: boolean
  onClose: () => void
}

export const MyApplicationModal = ({
  type,
  application,
  open,
  onClose
}: MyApplicationModalProps) => {
  const router = useRouter()

  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const onActionSuccess = () => {
    setEditModalOpen(false)
    onClose()
  }

  const { mutate: deleteCargo, isPending: isCargoDeleting } = useCargoDelete({
    onSuccess: onActionSuccess
  })

  const { mutate: deleteRoute, isPending: isRouteDeleting } = useRouteDelete({
    onSuccess: onActionSuccess
  })

  const { appliedResponse, isAppliedResponseLoading } = useAppliedReponse({
    applicationId: application.id
  })

  const deleteApplication = (applicationId: string) => {
    if (type === 'Cargo') {
      deleteCargo(applicationId)
    }

    if (type === 'Route') {
      deleteRoute(applicationId)
    }
  }

  const toOffersPage = () => {
    router.push(`/profile/offers/${application.id}`)
  }

  const isApplicationFinished = application.status === ApplicationStatus.FINISHED

  return (
    <>
      <ApplicationInfoModal
        title={type}
        application={application}
        open={open}
        grayBox={Boolean(appliedResponse)}
        slots={{
          bottom:
            appliedResponse && !isAppliedResponseLoading ? (
              <ConfirmWorkDone
                applicationId={application.id}
                status={application.status}
                message={appliedResponse.message}
                user={appliedResponse.user}
                onSuccess={onClose}
              />
            ) : (
              <div className={classes.bottom}>
                <button className={classes.offersButton} onClick={toOffersPage}>
                  Your offers{' '}
                  <Image width={12} height={12} src='/icons/arrow-right.svg' alt='arrow right' />
                </button>

                <div className={classes.actions}>
                  <Button
                    type='button'
                    size='small'
                    color='secondary'
                    onClick={() => {
                      setEditModalOpen(true)
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    isLoading={isCargoDeleting || isRouteDeleting}
                    type='button'
                    size='small'
                    color='error'
                    onClick={() => {
                      deleteApplication(application.id)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )
        }}
        onClose={onClose}
      />

      {type === 'Cargo' ? (
        <CargoCreateEditModal
          inEditMode
          cargo={application}
          open={isEditModalOpen}
          onClose={onActionSuccess}
        />
      ) : null}

      {type === 'Route' ? (
        <RouteCreateEditModal
          inEditMode
          route={application}
          open={isEditModalOpen}
          onClose={onActionSuccess}
        />
      ) : null}
    </>
  )
}
