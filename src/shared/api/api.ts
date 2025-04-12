import axios, { type AxiosError } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { refreshAuth } from './refreshAuth'

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE
})

export const setHeaderBearerToken = (token: string) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const removeHeaderBearerToken = () => {
  delete API.defaults.headers.common.Authorization
}

type Error = {
  detail: string
}

createAuthRefreshInterceptor(API, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
  shouldRefresh: (err: AxiosError<Error>) => {
    if (!err.response || !err.response.data.detail) return false

    const { detail } = err.response.data

    if (
      typeof detail === 'string' &&
      (detail === 'Token is expired' || detail === 'Unknown token')
    ) {
      return true
    }

    return false

    // const { config, request } = error

    // if (config && request) {
    //   return request.responseURL === `${config.baseURL}/role`
    // }

    // return false
  }
})
