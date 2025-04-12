'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { changeRouteStatus } from '../api/route'
import { ApplicationStatus } from '@/entities/application'

type UseRouteDeleteProps = {
  onSuccess: () => void
}

export const useRouteDelete = ({ onSuccess }: UseRouteDeleteProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (routeId: string) => {
      return changeRouteStatus({ routeId, status: ApplicationStatus.ARCHIVED })
    },
    onSuccess: () => {
      toast.success('Route successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ['carrier-routes']
      })
      onSuccess()
    }
  })
}
