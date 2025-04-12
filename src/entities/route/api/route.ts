import { API } from '@/shared/api'

import { transformRoute } from '../utils/transformRoute'

import type { GetRoutesListPayload } from './route.types'
import type { RoutesListResponse } from '../types/route.types'

export const getRoutesList = async ({
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
}: GetRoutesListPayload) => {
  const { data } = await API.get<RoutesListResponse>('/route_applications', {
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
    routesList: data.content.map(transformRoute),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}
