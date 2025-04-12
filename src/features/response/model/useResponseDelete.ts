'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useUser } from '@/shared/hooks/useUser'
import {
  deleteCargoResponse as deleteCargoResponseAPI,
  deleteRouteResponse as deleteRouteResponseAPI
} from '../api/response'

type UseResponseDeleteProps = {
  onSuccess: () => void
}

export const useResponseDelete = ({ onSuccess }: UseResponseDeleteProps) => {
  const queryClient = useQueryClient()

  const { userRole } = useUser()

  const onResponseDeleteSuccess = () => {
    toast.success('Your response has been successfully deleted')

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

  const { mutate: deleteCargoResponse, isPending: cargoReponseInProcess } = useMutation({
    mutationFn: deleteCargoResponseAPI,
    onSuccess: onResponseDeleteSuccess
  })

  const { mutate: deleteRouteResponse, isPending: routeReponseInProcess } = useMutation({
    mutationFn: deleteRouteResponseAPI,
    onSuccess: onResponseDeleteSuccess
  })

  return {
    deleteResponse: userRole === 'CARRIER' ? deleteCargoResponse : deleteRouteResponse,
    inProcess: cargoReponseInProcess || routeReponseInProcess
  }
}
