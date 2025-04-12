'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { editRoute } from '../api/route'

type UseRouteEditProps = {
  onSuccess: () => void
}

export const useRouteEdit = ({ onSuccess }: UseRouteEditProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carrier-routes']
      })

      toast.success('Route successfully edited')

      onSuccess()
    }
  })
}
