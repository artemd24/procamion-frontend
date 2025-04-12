'use client'

import { useQuery } from '@tanstack/react-query'

import { getShipperCargoes } from '../api/shipper'

import type { ApplicationStatus } from '@/entities/application'

type UseShipperCargoesProps = {
  page: number
  pageSize: number
  status: ApplicationStatus[]
  enabled: boolean
}

export const useShipperCargoes = ({ page, pageSize, status, enabled }: UseShipperCargoesProps) => {
  return useQuery({
    queryKey: ['shipper-cargoes', page, status],
    queryFn: () => getShipperCargoes({ page, pageSize, status }),
    enabled
  })
}
