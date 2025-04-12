'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'
import { useChooseCargoResponse } from '../../model/useChooseCargoResponse'
import { ResponseAcceptConfirmModal } from '../ResponseAcceptConfirmModal/ResponseAcceptConfirmModal'

import classes from './CargoResponseActions.module.scss'

type CargoResponseActionsProps = {
  responseId: string
  cargoId: string
}

export const CargoResponseActions = ({ responseId, cargoId }: CargoResponseActionsProps) => {
  const router = useRouter()

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const { mutate: acceptResponse, isPending: isResponseAccepting } = useChooseCargoResponse({
    onSuccess: () => {
      router.push('/profile/applications')
    }
  })

  return (
    <div className={classes.cargoResponseActions}>
      <Button
        isLoading={isResponseAccepting}
        type='button'
        size='small'
        onClick={() => {
          setConfirmModalOpen(true)
        }}
      >
        Accept
      </Button>

      <Button type='button' size='small' color='error'>
        Reject
      </Button>

      <ResponseAcceptConfirmModal
        open={isConfirmModalOpen}
        onConfirm={() => {
          acceptResponse({ cargoId, responseId })
        }}
        onClose={() => {
          setConfirmModalOpen(false)
        }}
      />
    </div>
  )
}
