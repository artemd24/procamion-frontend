import { API } from '@/shared/api'
import { transformRoute } from '@/entities/route'
import { transformCargo } from '@/entities/cargo'

import type {
  CarrierResponseItem,
  ShipperResponseItem,
  GetResponsesPayload,
  GetApplicationResponsesPayload,
  RouteResponse,
  CargoResponse
} from './response.types'
import type { ResponseList } from '@/shared/api/types'

export const getShipperResponses = async ({ page, pageSize, status }: GetResponsesPayload) => {
  const { data } = await API.get<ResponseList<ShipperResponseItem>>('/shippers/route-responses', {
    params: {
      page_number: page,
      page_size: pageSize,
      statuses: status
    }
  })

  return {
    routesList: data.content.map(
      ({
        id,
        created_at: createDate,
        message,
        route_application: route,
        shipper,
        updated_at: updateDate
      }) => {
        return {
          id,
          createDate,
          updateDate,
          shipper,
          message,
          application: transformRoute(route)
        }
      }
    ),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}

export const getCarrierResponses = async ({ page, pageSize, status }: GetResponsesPayload) => {
  const { data } = await API.get<ResponseList<CarrierResponseItem>>('/carriers/cargo-responses', {
    params: {
      page_number: page,
      page_size: pageSize,
      statuses: status
    }
  })

  return {
    cargoesList: data.content.map(
      ({
        id,
        cargo_application: cargo,
        carrier,
        created_at: createDate,
        message,
        updated_at: updateDate
      }) => {
        return {
          id,
          createDate,
          updateDate,
          carrier,
          message,
          application: transformCargo(cargo)
        }
      }
    ),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}

export const getRouteResponses = async ({
  applicationId,
  page,
  pageSize
}: GetApplicationResponsesPayload) => {
  const { data } = await API.get<ResponseList<RouteResponse>>(
    `/route_applications/${applicationId}/responses`,
    {
      params: {
        page_number: page,
        page_size: pageSize
      }
    }
  )

  return {
    responses: data.content.map(
      ({ id, created_at: createDate, message, route_application: route, shipper }) => {
        return {
          id,
          createDate,
          message,
          shipper,
          application: transformRoute(route)
        }
      }
    ),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}

export const getCargoResponses = async ({
  applicationId,
  page,
  pageSize
}: GetApplicationResponsesPayload) => {
  const { data } = await API.get<ResponseList<CargoResponse>>(
    `/cargo_applications/${applicationId}/responses`,
    {
      params: {
        page_number: page,
        page_size: pageSize
      }
    }
  )

  return {
    responses: data.content.map(
      ({ id, created_at: createDate, message, cargo_application: cargo, carrier }) => {
        return {
          id,
          createDate,
          message,
          carrier,
          application: transformCargo(cargo)
        }
      }
    ),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}

export const getCargoAppliedResponse = async (cargoId: string) => {
  const { data } = await API.get<ResponseList<CargoResponse>>(
    `/cargo_applications/${cargoId}/responses`,
    {
      params: {
        statuses: 'APPLIED'
      }
    }
  )

  return data.content.length
    ? data.content.map(
        ({ id, created_at: createDate, message, cargo_application: cargo, carrier }) => {
          return {
            id,
            createDate,
            message,
            user: carrier,
            application: transformCargo(cargo)
          }
        }
      )[0]
    : null
}

export const getRouteAppliedResponse = async (cargoId: string) => {
  const { data } = await API.get<ResponseList<RouteResponse>>(
    `/route_applications/${cargoId}/responses`,
    {
      params: {
        statuses: 'APPLIED'
      }
    }
  )

  return data.content.length
    ? data.content.map(
        ({ id, created_at: createDate, message, route_application: route, shipper }) => {
          return {
            id,
            createDate,
            message,
            user: shipper,
            application: transformRoute(route)
          }
        }
      )[0]
    : null
}
