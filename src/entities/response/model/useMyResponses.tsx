'use client'

import { useQuery } from '@tanstack/react-query'

import { useUser } from '@/shared/hooks/useUser'
import { getCarrierResponses, getShipperResponses } from '../api/response'

import { ResponseStatus } from '../types/response.types'

type Status = 'Active' | 'Archived'

type useMyResponsesProps = {
  page: number
  pageSize: number
  status: Status
}

const convertStatus = (status: Status) => {
  if (status === 'Active') return ResponseStatus.ACTIVE
  if (status === 'Archived') return ResponseStatus.ARCHIVED

  return ResponseStatus.ARCHIVED
}

export const useMyResponses = ({ page, pageSize, status }: useMyResponsesProps) => {
  const { userRole } = useUser()

  const { data: carrierResponses, isLoading: isCarrierResponsesLoading } = useQuery({
    queryKey: ['carrier-responses', page, pageSize, status],
    queryFn: () => getCarrierResponses({ page, pageSize, status: convertStatus(status) }),
    enabled: userRole === 'CARRIER'
  })

  const { data: shipperResponses, isLoading: isShipperResponsesLoading } = useQuery({
    queryKey: ['shipper-responses', page, pageSize, status],
    queryFn: () => getShipperResponses({ page, pageSize, status: convertStatus(status) }),
    enabled: userRole === 'SHIPPER'
  })

  return {
    data: userRole === 'CARRIER' ? carrierResponses?.cargoesList : shipperResponses?.routesList,
    pagesNumber:
      userRole === 'CARRIER' ? carrierResponses?.pagesNumber : shipperResponses?.pagesNumber,
    isLoading: isCarrierResponsesLoading || isShipperResponsesLoading
  }
}
