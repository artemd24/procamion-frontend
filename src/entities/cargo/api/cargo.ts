import { API } from '@/shared/api'

import { transformCargo } from '../utils/transformCargo'

import type { CargoesListResponse } from '../types/cargo.types'
import type { GetCargoesListPayload } from './cargo.types'

export const getCargoesList = async ({
  cityFrom,
  cityTo,
  countryFrom,
  countryTo,
  departureDate,
  pageNumber,
  pageSize,
  palletsRangeStart,
  palletsRangeEnd,
  priceRangeEnd,
  priceRangeStart,
  temperatureRangeEnd,
  temperatureRangeStart
}: GetCargoesListPayload) => {
  const { data } = await API.get<CargoesListResponse>('/cargo_applications', {
    params: {
      page_number: pageNumber,
      page_size: pageSize,
      country_from: countryFrom,
      country_to: countryTo,
      city_from: cityFrom,
      city_to: cityTo,
      departure_date: departureDate,
      price_range_start: priceRangeStart,
      price_range_end: priceRangeEnd,
      pallets_range_start: palletsRangeStart,
      pallets_range_end: palletsRangeEnd,
      temperature_range_start: temperatureRangeStart,
      temperature_range_end: temperatureRangeEnd
    }
  })

  return {
    cargoesList: data.content.map(transformCargo),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}
