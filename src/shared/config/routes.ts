export const ROUTE_NAMES = {
  MAIN: '/',
  PASSWORD_RESTORE: '/password-restore',
  NEW_PASSWORD: '/new-password',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',

  PROFILE: '/profile',
  PROFILE_APPLICATIONS: '/profile/applications',
  PROFILE_RESPONSES: '/profile/responses',
  PROFILE_SETTINGS: '/profile/settings',
  PROFILE_OFFERS: '/profile/offers',

  SEARCH: '/search'
} as const

export const AUTH_ROUTES = [
  ROUTE_NAMES.PROFILE,
  ROUTE_NAMES.PROFILE_APPLICATIONS,
  ROUTE_NAMES.PROFILE_RESPONSES,
  ROUTE_NAMES.PROFILE_SETTINGS,
  ROUTE_NAMES.PROFILE_OFFERS
] as const

export const GUEST_ROUTES = [
  ROUTE_NAMES.MAIN,
  ROUTE_NAMES.PASSWORD_RESTORE,
  ROUTE_NAMES.NEW_PASSWORD,
  ROUTE_NAMES.SIGN_UP,
  ROUTE_NAMES.SIGN_IN
] as const
