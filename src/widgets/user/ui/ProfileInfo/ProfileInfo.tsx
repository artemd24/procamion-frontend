'use client'

import { useState } from 'react'

import { ShipperProfileInfo } from '@/entities/shipper'
import { ShipperProfileEditForm } from '@/features/shipper'
import { CarrierProfileInfo } from '@/entities/carrier'
import { CarrierProfileEditForm } from '@/features/carrier'

import { useUser } from '@/shared/hooks/useUser'

export const ProfileInfo = () => {
  const [isEditMode, setEditMode] = useState(false)

  const { userRole } = useUser()

  if (userRole === 'SHIPPER') {
    return !isEditMode ? (
      <ShipperProfileInfo
        onProfileEdit={() => {
          setEditMode(true)
        }}
      />
    ) : (
      <ShipperProfileEditForm
        onEditFinish={() => {
          setEditMode(false)
        }}
      />
    )
  }

  if (userRole === 'CARRIER') {
    return !isEditMode ? (
      <CarrierProfileInfo
        onProfileEdit={() => {
          setEditMode(true)
        }}
      />
    ) : (
      <CarrierProfileEditForm
        onEditFinish={() => {
          setEditMode(false)
        }}
      />
    )
  }
}
