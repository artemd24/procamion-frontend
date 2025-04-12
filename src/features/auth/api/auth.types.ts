export type UserRole = 'CARRIER' | 'SHIPPER'

type DrivingLicense = {
  number: string
  expireDate: string
  insuranceDate: string
}

export type CarrierSignUpData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  language: string
  country: string
  city: string
  drivingLicense: DrivingLicense
}

export type CarrierSignUpResponse = {
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

export type ShipperSignUpData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  companyName: string
  password: string
  language: string
  country: string
  city: string
}

export type ShipperSignUpResponse = {
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

export type LoginData = {
  email: string
  password: string
}

export type AuthTokens = {
  access_token: string
  access_token_expires: number
  refresh_token: string
  refresh_token_expires: number
}
