'use client'

import { ApplicationStatus } from '@/entities/application'
import { useCarrierRoutes } from '@/entities/carrier'
import { useShipperCargoes } from '@/entities/shipper'
import { useUser } from '@/shared/hooks/useUser'

type Status = 'Active' | 'Completed'

type UseMyApplicationsListProps = {
  status: Status
  page: number
  pageSize: number
}

const convertStatus = (status: Status) => {
  if (status === 'Active') return [ApplicationStatus.OPEN, ApplicationStatus.IN_WORK]
  if (status === 'Completed') return [ApplicationStatus.FINISHED]

  return [ApplicationStatus.FINISHED]
}

export const useMyApplicationsList = ({ status, page, pageSize }: UseMyApplicationsListProps) => {
  const { userRole } = useUser()

  const { data: carrierRoutes, isLoading: isCarrierRoutesLoading } = useCarrierRoutes({
    page,
    pageSize,
    status: convertStatus(status),
    enabled: userRole === 'CARRIER'
  })

  const { data: shipperCargoes, isLoading: isShipperCargoesLoading } = useShipperCargoes({
    page,
    pageSize,
    status: convertStatus(status),
    enabled: userRole === 'SHIPPER'
  })

  return {
    data: userRole === 'CARRIER' ? carrierRoutes : shipperCargoes,
    isLoading: isCarrierRoutesLoading || isShipperCargoesLoading
  }
}
