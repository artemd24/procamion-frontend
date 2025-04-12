'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createRoute } from '../api/route'

type UseRouteCreateProps = {
  onSuccess: () => void
}

export const useRouteCreate = ({ onSuccess }: UseRouteCreateProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carrier-routes']
      })

      toast.success('Route successfully created')

      onSuccess()
    }
  })
}
