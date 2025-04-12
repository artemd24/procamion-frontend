'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { changeCargoStatus } from '../api/cargo'
import { ApplicationStatus } from '@/entities/application'

type UseCargoDeleteProps = {
  onSuccess: () => void
}

export const useCargoDelete = ({ onSuccess }: UseCargoDeleteProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cargoId: string) => {
      return changeCargoStatus({ cargoId, status: ApplicationStatus.ARCHIVED })
    },
    onSuccess: () => {
      toast.success('Cargo successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ['shipper-cargoes']
      })
      onSuccess()
    }
  })
}
