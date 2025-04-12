'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createCargo } from '../api/cargo'

type UseCargoCreateProps = {
  onSuccess: () => void
}

export const useCargoCreate = ({ onSuccess }: UseCargoCreateProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shipper-cargoes']
      })

      toast.success('Cargo successfully created')

      onSuccess()
    }
  })
}
