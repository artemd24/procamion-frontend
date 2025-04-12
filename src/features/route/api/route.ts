import { API } from '@/shared/api'

import type { ChangeRouteStatusPayload, CreateRoutePayload, EditRoutePayload } from './route.types'

export const createRoute = ({
  cityFrom,
  cityTo,
  countryFrom,
  countryTo,
  currency,
  departureDate,
  description,
  ftlPrice,
  ltlPrice,
  palletsNumber,
  temperature
}: CreateRoutePayload) => {
  return API.post('/route_applications/', {
    description,
    country_from: countryFrom,
    country_to: countryTo,
    city_from: cityFrom,
    city_to: cityTo,
    departure_date: departureDate,
    temperature,
    number_of_pallets: palletsNumber,
    ltl_price: ltlPrice,
    ftl_price: ftlPrice,
    currency
  })
}

export const changeRouteStatus = ({ routeId, status }: ChangeRouteStatusPayload) => {
  return API.patch(`/route_applications/${routeId}/change-status/${status}`)
}

export const editRoute = ({ routeId, routeData }: EditRoutePayload) => {
  const {
    cityFrom,
    cityTo,
    countryFrom,
    countryTo,
    currency,
    departureDate,
    description,
    ftlPrice,
    ltlPrice,
    palletsNumber,
    temperature
  } = routeData

  return API.patch(`/route_applications/${routeId}`, {
    description,
    country_from: countryFrom,
    country_to: countryTo,
    city_from: cityFrom,
    city_to: cityTo,
    departure_date: departureDate,
    temperature,
    number_of_pallets: palletsNumber,
    ltl_price: ltlPrice,
    ftl_price: ftlPrice,
    currency
  })
}
