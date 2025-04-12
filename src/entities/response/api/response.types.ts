import type { CargoResponse as CargoResponseInfo } from '@/entities/cargo'
import type { RouteResponse as RouteResponseInfo } from '@/entities/route'
import type { ResponseStatus } from '../types/response.types'

type UserInfo = {
  id: string
  first_name: string
  last_name: string
}

type ResponseBase = {
  id: string
  created_at: string
  updated_at: string
  message: string
}

export type ShipperResponseItem = ResponseBase & {
  shipper: UserInfo
  route_application: RouteResponseInfo
}

export type CarrierResponseItem = ResponseBase & {
  carrier_id: string
  carrier: UserInfo
  cargo_application: CargoResponseInfo
}

export type GetResponsesPayload = {
  status: ResponseStatus
  page: number
  pageSize: number
}

export type GetApplicationResponsesPayload = {
  applicationId: string
  page: number
  pageSize: number
}

export type RouteResponse = {
  id: string
  created_at: string
  updated_at: string
  message: string
  shipper: UserInfo
  route_application: RouteResponseInfo
}

export type CargoResponse = {
  id: string
  created_at: string
  updated_at: string
  message: string
  carrier: UserInfo
  carrierId: string
  cargo_application: CargoResponseInfo
}
