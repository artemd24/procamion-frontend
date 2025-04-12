import type { ApplicationStatus } from '@/entities/application'

export type ShipperProfileInfo = {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  company_name: string
  language: string
  country: string
  city: string
  id: string
  phone_number_verified: boolean
  email_verified: boolean
  verified: boolean
}

export type GetShipperCargoesPayload = {
  status: ApplicationStatus[]
  page: number
  pageSize: number
}
