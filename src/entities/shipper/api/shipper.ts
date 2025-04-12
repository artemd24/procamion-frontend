import { API } from '@/shared/api'

import { transformCargo, type CargoesListResponse } from '@/entities/cargo'
import type { GetShipperCargoesPayload, ShipperProfileInfo } from './shipper.types'

const transformShipper = (Shipper: ShipperProfileInfo) => {
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone,
    city,
    company_name: companyName,
    country,
    email_verified: isEmailVerified,
    language,
    phone_number_verified: isPhoneVerified,
    verified
  } = Shipper

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    city,
    companyName,
    country,
    language,
    isEmailVerified,
    isPhoneVerified,
    verified
  }
}

export const getShipperProfileInfo = async () => {
  const { data } = await API.get<ShipperProfileInfo>('/shippers')

  return transformShipper(data)
}

export const getShipperCargoes = async ({ page, pageSize, status }: GetShipperCargoesPayload) => {
  const statuses = status
    .map((status, idx) => {
      if (idx === 0) {
        return `statuses=${status}`
      }

      return `&statuses=${status}`
    })
    .join('')

  const { data } = await API.get<CargoesListResponse>(`/shippers/cargo-applications?${statuses}`, {
    params: {
      page_number: page,
      page_size: pageSize
    }
  })

  return {
    applicationsList: data.content.map(transformCargo),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}
