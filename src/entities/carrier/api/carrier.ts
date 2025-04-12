import { API } from '@/shared/api'

import { transformRoute, type RoutesListResponse } from '@/entities/route'

import type { CarrierProfileInfo, GetCarrierRoutesPayload } from './carrier.types'

const transformCarrier = (carrier: CarrierProfileInfo) => {
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone,
    driving_license: number,
    driving_license_expiration_date: expireDate,
    driving_license_issuance_date: issuanceDate,
    city,
    country,
    language
  } = carrier

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    language,
    drivingLicense: {
      number,
      expireDate,
      issuanceDate
    }
  }
}

export const getCarrierProfileInfo = async () => {
  const { data } = await API.get<CarrierProfileInfo>('/carriers')

  return transformCarrier(data)
}

export const getCarrierRoutes = async ({ page, pageSize, status }: GetCarrierRoutesPayload) => {
  const statuses = status
    .map((status, idx) => {
      if (idx === 0) {
        return `statuses=${status}`
      }

      return `&statuses=${status}`
    })
    .join('')

  const { data } = await API.get<RoutesListResponse>(`/carriers/route-applications?${statuses}`, {
    params: {
      page_number: page,
      page_size: pageSize
    }
  })

  return {
    applicationsList: data.content.map(transformRoute),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}
