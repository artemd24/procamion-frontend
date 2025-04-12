'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editCarrierInfo } from '../api/carrier'

type UseCarrierInfoEditProps = {
  onSuccess: () => void
}

export const useCarrierInfoEdit = ({ onSuccess }: UseCarrierInfoEditProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editCarrierInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carrier-profile-info']
      })

      onSuccess()
    }
  })
}
