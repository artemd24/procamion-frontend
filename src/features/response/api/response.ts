import { API } from '@/shared/api'
import type {
  ChooseCargoResponsePayload,
  ChooseRouteResponsePayload,
  CreateResponsePayload,
  EditResponsePayload
} from './response.types'

export const createCargoResponse = ({ applicationId, comment }: CreateResponsePayload) => {
  return API.post(`/cargo_applications/${applicationId}/response`, {
    message: comment
  })
}

export const createRouteResponse = ({ applicationId, comment }: CreateResponsePayload) => {
  return API.post(`/route_applications/${applicationId}/response`, {
    message: comment
  })
}

export const editCargoResponse = ({ responseId, comment }: EditResponsePayload) => {
  return API.patch(`/cargo_applications/response/${responseId}`, {
    message: comment
  })
}

export const editRouteResponse = ({ responseId, comment }: EditResponsePayload) => {
  return API.patch(`/route_applications/response/${responseId}`, {
    message: comment
  })
}

export const deleteCargoResponse = (responseId: string) => {
  return API.delete(`/cargo_applications/response/${responseId}`)
}

export const deleteRouteResponse = (responseId: string) => {
  return API.delete(`/route_applications/response/${responseId}`)
}

export const chooseCargoResponse = ({ cargoId, responseId }: ChooseCargoResponsePayload) => {
  return API.put(`/cargo_applications/${cargoId}/responses/${responseId}`)
}

export const chooseRouteResponse = ({ routeId, responseId }: ChooseRouteResponsePayload) => {
  return API.put(`/route_applications/${routeId}/responses/${responseId}`)
}
