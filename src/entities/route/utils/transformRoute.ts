import type { RouteResponse } from '../types/route.types'

export const transformRoute = (route: RouteResponse) => {
  const {
    id,
    city_from: departureCity,
    city_to: arrivalCity,
    country_from: departureCountry,
    country_to: arrivalCountry,
    created_at: createDate,
    currency,
    departure_date: departureDate,
    description: comment,
    ftl_price: ftlPrice,
    ltl_price: ltlPrice,
    number_of_pallets: palletsNumber,
    temperature,
    updated_at: updateDate,
    status
  } = route

  return {
    id,
    departureCity,
    arrivalCity,
    departureCountry,
    arrivalCountry,
    createDate,
    currency,
    departureDate,
    comment,
    ftlPrice,
    ltlPrice,
    palletsNumber,
    temperature,
    updateDate,
    status
  }
}
