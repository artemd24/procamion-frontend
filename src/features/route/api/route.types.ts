import type { ApplicationStatus } from '@/entities/application'
import type { Currency } from '@/shared/const/local.const'

export type CreateRoutePayload = {
  description: string
  countryFrom: string
  cityFrom: string
  countryTo: string
  cityTo: string
  departureDate: string | null
  temperature: number
  palletsNumber: number
  ltlPrice: number
  ftlPrice: number
  currency: Currency
}

export type ChangeRouteStatusPayload = {
  routeId: string
  status: ApplicationStatus
}

export type EditRoutePayload = {
  routeId: string
  routeData: CreateRoutePayload
}
