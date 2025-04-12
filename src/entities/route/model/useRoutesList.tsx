'use client'

import { useQuery } from '@tanstack/react-query'

import { getRoutesList } from '../api/route'

type Filters = {
  departureCountry: string
  departureCity: string
  arrivalCountry: string
  arrivalCity: string
  departureDate: string
  priceRangeStart: number
  priceRangeEnd: number
  palletsNumberRangeStart: number
  palletsNumberRangeEnd: number
  temperatureRangeStart: number
  temperatureRangeEnd: number
}

type UseRoutesListProps = {
  filters?: Partial<Filters>
  page: number
  pageSize: number
}

export const useRoutesList = ({ filters = {}, page, pageSize }: UseRoutesListProps) => {
  const {
    departureCountry,
    departureCity,
    arrivalCountry,
    arrivalCity,
    departureDate,
    priceRangeStart,
    priceRangeEnd,
    palletsNumberRangeStart,
    palletsNumberRangeEnd,
    temperatureRangeStart,
    temperatureRangeEnd
  } = filters

  return useQuery({
    queryKey: ['routes-list', page, ...Object.values(filters)],
    queryFn: () =>
      getRoutesList({
        countryFrom: departureCountry,
        cityFrom: departureCity,
        countryTo: arrivalCountry,
        cityTo: arrivalCity,
        departureDate,
        priceRangeStart,
        priceRangeEnd,
        palletsRangeStart: palletsNumberRangeStart,
        palletsRangeEnd: palletsNumberRangeEnd,
        temperatureRangeStart,
        temperatureRangeEnd,
        pageNumber: page,
        pageSize
      })
  })
}
