import { API } from '@/shared/api'

import type {
  CarrierSignUpData,
  LoginData,
  ShipperSignUpData,
  AuthTokens,
  UserRole,
  ShipperSignUpResponse,
  CarrierSignUpResponse
} from './auth.types'

const transformAuthTokens = (tokens: AuthTokens) => {
  const {
    access_token: accessToken,
    access_token_expires: accessTokenExpires,
    refresh_token: refreshToken,
    refresh_token_expires: refreshTokenExpires
  } = tokens

  return {
    accessToken,
    accessTokenExpires,
    refreshToken,
    refreshTokenExpires
  }
}

export const carrierSignUp = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  city,
  country,
  language,
  drivingLicense
}: CarrierSignUpData) => {
  return API.post<CarrierSignUpResponse>('/carriers/register', {
    first_name: firstName,
    last_name: lastName,
    phone_number: phone,
    email: email,
    city,
    country,
    language,
    driving_license_issuance_date: drivingLicense.insuranceDate,
    driving_license_expiration_date: drivingLicense.expireDate,
    driving_license: drivingLicense.number,
    password
  })
}

export const shipperSignUp = ({
  firstName,
  lastName,
  phone,
  email,
  companyName,
  password,
  language,
  city,
  country
}: ShipperSignUpData) => {
  return API.post<ShipperSignUpResponse>('/shippers/register', {
    first_name: firstName,
    last_name: lastName,
    phone_number: phone,
    email,
    company_name: companyName,
    password,
    language,
    city,
    country
  })
}

export const carrierSignIn = async ({ email, password }: LoginData) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  const { data } = await API.post<AuthTokens>('/carriers/login', formData)

  return transformAuthTokens(data)
}

export const shipperSignIn = async ({ email, password }: LoginData) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  const { data } = await API.post<AuthTokens>('/shippers/login', formData)

  return transformAuthTokens(data)
}

export const refreshCarrierToken = async (refreshToken: string) => {
  const { data } = await API.post<AuthTokens>('/carriers/refresh', {
    refresh_token: refreshToken
  })

  return transformAuthTokens(data)
}

export const refreshShipperToken = async (refreshToken: string) => {
  const { data } = await API.post<AuthTokens>('/shippers/refresh', {
    refresh_token: refreshToken
  })

  return transformAuthTokens(data)
}

export const getUserRole = async () => {
  const { data: role } = await API.get<UserRole>('/role')

  return role
}
