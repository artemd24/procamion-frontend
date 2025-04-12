'use client'

import { useQuery } from '@tanstack/react-query'

import { getCargoResponses } from '../api/response'

type UseCargoResponsesProps = {
  cargoId: string
  page: number
  pageSize: number
}

export const useCargoResponses = ({ cargoId, page, pageSize }: UseCargoResponsesProps) => {
  const { data: responsesData, isLoading: isResponsesLoading } = useQuery({
    queryKey: ['cargo-responses', cargoId],
    queryFn: () => getCargoResponses({ applicationId: cargoId, page, pageSize })
  })

  return {
    responsesData,
    isResponsesLoading
  }
}
