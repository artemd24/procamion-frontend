'use client'

import { useQuery } from '@tanstack/react-query'

import { getCarrierProfileInfo } from '../api/carrier'

type UseCarrierProfileInfoProps = {
  enabled?: boolean
}

export const useCarrierProfileInfo = ({ enabled = true }: UseCarrierProfileInfoProps = {}) => {
  return useQuery({
    queryKey: ['carrier-profile-info'],
    queryFn: getCarrierProfileInfo,
    enabled
  })
}
