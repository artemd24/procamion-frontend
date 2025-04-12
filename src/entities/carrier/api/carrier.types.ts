import type { ApplicationStatus } from '@/entities/application'

export type CarrierProfileInfo = {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  language: string
  country: string
  city: string
  driving_license_issuance_date: string
  driving_license_expiration_date: string
  driving_license: string
  id: string
}

export type GetCarrierRoutesPayload = {
  status: ApplicationStatus[]
  page: number
  pageSize: number
}
