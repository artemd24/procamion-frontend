'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useUser } from '@/shared/hooks/useUser'
import {
  routeChangeStatus as routeChangeStatusAPI,
  cargoChangeStatus as cargoChangeStatusAPI
} from '../api/application'

type UseApplicationChangeStatusProps = {
  onSuccess: () => void
}

export const useApplicationChangeStatus = ({ onSuccess }: UseApplicationChangeStatusProps) => {
  const queryClient = useQueryClient()

  const { userRole } = useUser()

  const { mutate: routeChangeStatus, isPending: isRouteStatusChanging } = useMutation({
    mutationFn: routeChangeStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carrier-routes']
      })
      toast.success('Route successfully finished')
      onSuccess()
    }
  })

  const { mutate: cargoChangeStatus, isPending: isCargoStatusChanging } = useMutation({
    mutationFn: cargoChangeStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shipper-cargoes']
      })
      toast.success('Cargo successfully finished')
      onSuccess()
    }
  })

  return {
    changeStatus: userRole === 'SHIPPER' ? cargoChangeStatus : routeChangeStatus,
    isChanging: isRouteStatusChanging || isCargoStatusChanging
  }
}
