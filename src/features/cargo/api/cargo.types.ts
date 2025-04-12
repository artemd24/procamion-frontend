import type { ApplicationStatus } from '@/entities/application'
import type { Currency } from '@/shared/const/local.const'

export type CreateCargoPayload = {
  type: 'FTL' | 'LTL'
  description: string
  countryFrom: string
  countryTo: string
  cityFrom: string
  cityTo: string
  addressFrom: string
  addressTo: string
  departureDate: string | null
  departureDateTime: string | null
  temperature: number
  palletsNumber: number
  ltlPrice: number
  ftlPrice: number
  currency: Currency
}

export type ChangeCargoStatusPayload = {
  cargoId: string
  status: ApplicationStatus
}

export type EditCargoPayload = {
  cargoId: string
  cargoData: CreateCargoPayload
}
