'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { editCargo } from '../api/cargo'

type UseCargoEditProps = {
  onSuccess: () => void
}

export const useCargoEdit = ({ onSuccess }: UseCargoEditProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shipper-cargoes']
      })

      toast.success('Cargo successfully edited')

      onSuccess()
    }
  })
}
