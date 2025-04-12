'use client'

import { createContext, useCallback, useState } from 'react'

type Filters = Partial<{
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
}>

type ApplicationSearchFiltersContextProps = {
  filters: Filters
  changeFilters: (filters: Filters) => void
}

export const ApplicationSearchFiltersContext = createContext(
  {} as ApplicationSearchFiltersContextProps
)

export const ApplicationSearchFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    priceRangeStart: undefined,
    priceRangeEnd: undefined,
    palletsNumberRangeStart: undefined,
    palletsNumberRangeEnd: undefined,
    temperatureRangeStart: undefined,
    temperatureRangeEnd: undefined
  })

  const changeFilters = useCallback((newFilters: Filters) => {
    setFilters((filters) => ({
      ...filters,
      ...newFilters
    }))
  }, [])

  return (
    <ApplicationSearchFiltersContext.Provider
      value={{
        filters,
        changeFilters
      }}
    >
      {children}
    </ApplicationSearchFiltersContext.Provider>
  )
}
