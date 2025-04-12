'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { changeCarrierPassword } from '../api/carrier'

type UseCarrierPasswordChangeProps = {
  onSuccess: () => void
}

export const useCarrierPasswordChange = ({ onSuccess }: UseCarrierPasswordChangeProps) => {
  return useMutation({
    mutationFn: changeCarrierPassword,
    onSuccess: () => {
      toast.success('Your password successfully changed')
      onSuccess()
    }
  })
}
