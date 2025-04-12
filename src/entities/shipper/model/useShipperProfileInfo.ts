'use client'

import { useQuery } from '@tanstack/react-query'

import { getShipperProfileInfo } from '../api/shipper'

type UseShipperProfileInfoProps = {
  enabled?: boolean
}

export const useShipperProfileInfo = ({ enabled = true }: UseShipperProfileInfoProps = {}) => {
  return useQuery({
    queryKey: ['shipper-profile-info'],
    queryFn: getShipperProfileInfo,
    enabled
  })
}
