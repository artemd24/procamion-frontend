'use client'

import { useMutation } from '@tanstack/react-query'

import { chooseCargoResponse } from '../api/response'
import { toast } from 'react-toastify'

type UseChooseCargoResponse = {
  onSuccess: () => void
}

export const useChooseCargoResponse = ({ onSuccess }: UseChooseCargoResponse) => {
  return useMutation({
    mutationFn: chooseCargoResponse,
    onSuccess: () => {
      onSuccess()

      toast.success('You have successfully accepted the reponse')
    }
  })
}
