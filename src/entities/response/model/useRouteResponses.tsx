'use client'

import { useQuery } from '@tanstack/react-query'

import { getRouteResponses } from '../api/response'

type UseRouteResponsesProps = {
  routeId: string
  page: number
  pageSize: number
}

export const useRouteResponses = ({ routeId, page, pageSize }: UseRouteResponsesProps) => {
  const { data: responsesData, isLoading: isResponsesLoading } = useQuery({
    queryKey: ['route-responses', routeId],
    queryFn: () => getRouteResponses({ applicationId: routeId, page, pageSize })
  })

  return {
    responsesData,
    isResponsesLoading
  }
}
