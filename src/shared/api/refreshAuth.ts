import type { UserRole } from '@/features/auth'
import { deleteCookie, getCookie, setCookie } from '../utils'
import { API, setHeaderBearerToken } from './api'
import { ROUTE_NAMES } from '../config'

type AuthTokens = {
  access_token: string
  access_token_expires: number
  refresh_token: string
  refresh_token_expires: number
}

export const refreshShipperToken = async (refreshToken: string) => {
  const { data } = await API.post<AuthTokens>('/shippers/refresh', {
    refresh_token: refreshToken
  })

  return data
}

export const refreshCarrierToken = async (refreshToken: string) => {
  const { data } = await API.post<AuthTokens>('/carriers/refresh', {
    refresh_token: refreshToken
  })

  return data
}

const setTokens = (failedRequest: any, accessToken: string, refreshToken: string) => {
  failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
  setCookie('accessToken', accessToken)
  setCookie('refreshToken', refreshToken)
  setHeaderBearerToken(accessToken)

  return Promise.resolve(accessToken)
}

export const refreshAuth = async (failedRequest: any) => {
  const oldRefreshToken = getCookie('refreshToken')

  if (!oldRefreshToken) {
    return Promise.reject()
  }

  const role = localStorage.getItem('userRole') as UserRole | undefined

  if (role === 'CARRIER') {
    try {
      const { access_token: accessToken, refresh_token: refreshToken } = await refreshCarrierToken(
        oldRefreshToken
      )

      setTokens(failedRequest, accessToken, refreshToken)
    } catch {
      localStorage.removeItem('userRole')
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      window.location.href = ROUTE_NAMES.SIGN_IN
    }
  }

  if (role === 'SHIPPER') {
    try {
      const { access_token: accessToken, refresh_token: refreshToken } = await refreshShipperToken(
        oldRefreshToken
      )

      setTokens(failedRequest, accessToken, refreshToken)
    } catch {
      localStorage.removeItem('userRole')
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      window.location.href = ROUTE_NAMES.SIGN_IN
    }
  }

  if (!role) {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    window.location.href = ROUTE_NAMES.SIGN_IN
  }
}
