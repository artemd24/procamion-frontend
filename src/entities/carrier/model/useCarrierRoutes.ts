'use client'

import { useQuery } from '@tanstack/react-query'

import { getCarrierRoutes } from '../api/carrier'

import type { ApplicationStatus } from '@/entities/application'

type UseCarrierRoutesProps = {
  page: number
  pageSize: number
  status: ApplicationStatus[]
  enabled: boolean
}

export const useCarrierRoutes = ({ page, pageSize, status, enabled }: UseCarrierRoutesProps) => {
  return useQuery({
    queryKey: ['carrier-routes', page, status],
    queryFn: () =>
      getCarrierRoutes({
        page,
        pageSize,
        status
      }),
    enabled
  })
}
