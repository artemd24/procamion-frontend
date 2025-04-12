'use client'

import { createContext, useEffect } from 'react'

import { type CarrierProfileInfoType, useCarrierProfileInfo } from '@/entities/carrier'
import { type ShipperProfileInfoType, useShipperProfileInfo } from '@/entities/shipper'
import { useUserRole } from '@/features/auth/model/useUserRole'
import { useAuth } from '@/shared/hooks/useAuth'

type UserRole = 'SHIPPER' | 'CARRIER'

type UserContextProps = {
  user: CarrierProfileInfoType | ShipperProfileInfoType
  userRole: UserRole
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth()

  const { data: userRole, isLoading: isUserRoleLoading } = useUserRole({
    enabled: isAuth
  })

  const { data: shipper, isLoading: isShipperLoading } = useShipperProfileInfo({
    enabled: isAuth && userRole === 'SHIPPER' && !isUserRoleLoading
  })
  const { data: carrier, isLoading: isCarrierLoading } = useCarrierProfileInfo({
    enabled: isAuth && userRole === 'CARRIER' && !isUserRoleLoading
  })

  useEffect(() => {
    if (!userRole) return

    localStorage.setItem('userRole', userRole)
  }, [userRole])

  const isUserLoading = isUserRoleLoading || isShipperLoading || isCarrierLoading

  const selectUserData = (
    userRole?: UserRole,
    shipper?: ShipperProfileInfoType,
    carrier?: CarrierProfileInfoType
  ) => {
    if (userRole === 'SHIPPER') return shipper

    return carrier
  }

  const user = selectUserData(userRole, shipper, carrier)

  if (!isAuth) {
    return children
  }

  if (isUserLoading || !userRole || !user) {
    return null
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userRole
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
