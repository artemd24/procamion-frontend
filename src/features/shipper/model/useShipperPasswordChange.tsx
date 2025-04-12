'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { changeShipperPassword } from '../api/shipper'

type UseShipperPasswordChangeProps = {
  onSuccess: () => void
}

export const useShipperPasswordChange = ({ onSuccess }: UseShipperPasswordChangeProps) => {
  return useMutation({
    mutationFn: changeShipperPassword,
    onSuccess: () => {
      toast.success('Your password successfully changed')
      onSuccess()
    }
  })
}
