'use client'

import { useUser } from '@/shared/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import { getCargoAppliedResponse, getRouteAppliedResponse } from '../api/response'

type UseAppliedReponseProps = {
  applicationId: string
}

export const useAppliedReponse = ({ applicationId }: UseAppliedReponseProps) => {
  const { userRole } = useUser()

  const { data: cargoAppliedResponse, isLoading: isCargoAppliedResponseLoading } = useQuery({
    queryKey: ['cargo-applied-response', applicationId],
    queryFn: () => getCargoAppliedResponse(applicationId),
    enabled: userRole === 'SHIPPER'
  })

  const { data: routeAppliedResponse, isLoading: isRouteAppliedResponseLoading } = useQuery({
    queryKey: ['route-applied-response', applicationId],
    queryFn: () => getRouteAppliedResponse(applicationId),
    enabled: userRole === 'CARRIER'
  })

  return {
    appliedResponse: userRole === 'SHIPPER' ? cargoAppliedResponse : routeAppliedResponse,
    isAppliedResponseLoading: isCargoAppliedResponseLoading || isRouteAppliedResponseLoading
  }
}
