import { Currency } from '@/shared/const/local.const'

export type ApplicationInfoType = {
  id: string
  departureCountry: string
  departureCity: string
  departureDate: string | null
  arrivalCountry: string
  arrivalCity: string
  arrivalDate?: string
  currency: Currency
  ftlPrice: number
  ltlPrice: number
  palletsNumber: number
  temperature: number
  comment: string
  createDate: string
  updateDate: string
  status?: ApplicationStatus
}

export enum ApplicationStatus {
  OPEN = 'OPEN',
  IN_WORK = 'IN_WORK',
  FINISHED = 'FINISHED',
  ARCHIVED = 'ARCHIVED'
}

export type ApplicationLoadType = 'FTL' | 'LTL'
