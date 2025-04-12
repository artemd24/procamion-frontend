import { setCookie } from '@/shared/utils'

export type AuthTokens = {
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
  refreshTokenExpires: number
}

export const saveJwtTokensToCookie = ({
  accessToken,
  accessTokenExpires,
  refreshToken,
  refreshTokenExpires
}: AuthTokens) => {
  setCookie('accessToken', accessToken, accessTokenExpires)
  setCookie('refreshToken', refreshToken, refreshTokenExpires)
}
