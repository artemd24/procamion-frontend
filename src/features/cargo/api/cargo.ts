import { API } from '@/shared/api'

import type { ChangeCargoStatusPayload, CreateCargoPayload, EditCargoPayload } from './cargo.types'

export const createCargo = ({
  addressFrom,
  addressTo,
  cityFrom,
  cityTo,
  description,
  countryFrom,
  countryTo,
  currency,
  departureDate,
  departureDateTime,
  ftlPrice,
  ltlPrice,
  palletsNumber,
  temperature,
  type
}: CreateCargoPayload) => {
  return API.post('/cargo_applications/', {
    type,
    description,
    country_from: countryFrom,
    country_to: countryTo,
    city_from: cityFrom,
    city_to: cityTo,
    address_from: addressFrom,
    address_to: addressTo,
    departure_date: departureDate,
    departure_datetime: departureDateTime,
    temperature,
    number_of_pallets: palletsNumber,
    ltl_price: ltlPrice,
    ftl_price: ftlPrice,
    currency
  })
}

export const changeCargoStatus = ({ cargoId, status }: ChangeCargoStatusPayload) => {
  return API.patch(`/cargo_applications/${cargoId}/change-status/${status}`)
}

export const editCargo = ({ cargoId, cargoData }: EditCargoPayload) => {
  const {
    addressFrom,
    addressTo,
    cityFrom,
    cityTo,
    countryFrom,
    countryTo,
    currency,
    departureDate,
    departureDateTime,
    description,
    ftlPrice,
    ltlPrice,
    palletsNumber,
    temperature,
    type
  } = cargoData

  return API.patch(`/cargo_applications/${cargoId}`, {
    type,
    description,
    country_from: countryFrom,
    country_to: countryTo,
    city_from: cityFrom,
    city_to: cityTo,
    address_from: addressFrom,
    address_to: addressTo,
    departure_date: departureDate,
    departure_datetime: departureDateTime,
    temperature,
    number_of_pallets: palletsNumber,
    ltl_price: ltlPrice,
    ftl_price: ftlPrice,
    currency
  })
}
