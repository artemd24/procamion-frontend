'use client'

import { useQuery } from '@tanstack/react-query'

import { getCargoesList } from '../api/cargo'

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

type UseCargoesListProps = {
  filters?: Partial<Filters>
  page: number
  pageSize: number
}

export const useCargoesList = ({ filters = {}, page, pageSize }: UseCargoesListProps) => {
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
    queryKey: ['cargoes-list', page, ...Object.values(filters)],
    queryFn: () =>
      getCargoesList({
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
