'use client'

import { useMutation } from '@tanstack/react-query'

import { chooseRouteResponse } from '../api/response'
import { toast } from 'react-toastify'

type UseChooseRouteResponseProps = {
  onSuccess: () => void
}

export const useChooseRouteResponse = ({ onSuccess }: UseChooseRouteResponseProps) => {
  return useMutation({
    mutationFn: chooseRouteResponse,
    onSuccess: () => {
      toast.success('You have successfully accepted the reponse')

      onSuccess()
    }
  })
}
