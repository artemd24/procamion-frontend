'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { carrierSignIn } from '../api/auth'
import { ROUTE_NAMES } from '@/shared/config'
import { saveJwtTokensToCookie, setHeaderBearerToken } from '@/shared/api'
import { useAuth } from '@/shared/hooks/useAuth'

export const useCarrierSignIn = () => {
  const router = useRouter()
  const { setAuth } = useAuth()

  return useMutation({
    mutationFn: carrierSignIn,
    onSuccess: ({ accessToken, accessTokenExpires, refreshToken, refreshTokenExpires }) => {
      saveJwtTokensToCookie({
        accessToken,
        accessTokenExpires,
        refreshToken,
        refreshTokenExpires
      })

      setAuth(true)

      setHeaderBearerToken(accessToken)

      router.push(ROUTE_NAMES.SEARCH)
    }
  })
}
