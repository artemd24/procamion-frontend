'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editShipperInfo } from '../api/shipper'

type UseShipperInfoEditProps = {
  onSuccess: () => void
}

export const useShipperInfoEdit = ({ onSuccess }: UseShipperInfoEditProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editShipperInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shipper-profile-info']
      })

      onSuccess()
    }
  })
}
