'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useUser } from '@/shared/hooks/useUser'
import {
  editCargoResponse as editCargoResponseAPI,
  editRouteResponse as editRouteResponseAPI
} from '../api/response'

type UseResponseEditProps = {
  onSuccess: () => void
}

export const useResponseEdit = ({ onSuccess }: UseResponseEditProps) => {
  const queryClient = useQueryClient()

  const { userRole } = useUser()

  const onResponseEditSuccess = () => {
    toast.success('Your response has been successfully edited')

    if (userRole === 'CARRIER') {
      queryClient.invalidateQueries({
        queryKey: ['carrier-responses']
      })
    } else {
      queryClient.invalidateQueries({
        queryKey: ['shipper-responses']
      })
    }

    onSuccess()
  }

  const { mutate: editCargoResponse, isPending: cargoReponseInProcess } = useMutation({
    mutationFn: editCargoResponseAPI,
    onSuccess: onResponseEditSuccess
  })

  const { mutate: editRouteResponse, isPending: routeReponseInProcess } = useMutation({
    mutationFn: editRouteResponseAPI,
    onSuccess: onResponseEditSuccess
  })

  return {
    editResponse: userRole === 'CARRIER' ? editCargoResponse : editRouteResponse,
    inProcess: cargoReponseInProcess || routeReponseInProcess
  }
}
