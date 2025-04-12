import { API } from '@/shared/api'

import type { ApplicationChangeStatusPayload } from './application.types'

export const routeChangeStatus = ({ applicationId, status }: ApplicationChangeStatusPayload) => {
  return API.patch(`/route_applications/${applicationId}/change-status/${status}`)
}
export const cargoChangeStatus = ({ applicationId, status }: ApplicationChangeStatusPayload) => {
  return API.patch(`/cargo_applications/${applicationId}/change-status/${status}`)
}
