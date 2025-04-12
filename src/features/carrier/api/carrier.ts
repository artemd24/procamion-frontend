import { API } from '@/shared/api'

import { ChangeCarrierPasswordPayload, EditCarrierInfoPayload } from './carrier.types'

export const editCarrierInfo = ({
  city,
  country,
  drivingLicense,
  drivingLicenseExpireDate,
  drivingLicenseReceiptDate,
  firstName,
  language,
  lastName,
  email,
  phone
}: EditCarrierInfoPayload) => {
  return API.patch('/carriers', {
    first_name: firstName,
    last_name: lastName,
    language,
    country,
    city,
    driving_license_issuance_date: drivingLicenseReceiptDate,
    driving_license_expiration_date: drivingLicenseExpireDate,
    driving_license: drivingLicense,
    email,
    phone_number: phone
  })
}

export const changeCarrierPassword = ({
  oldPassword,
  newPassword
}: ChangeCarrierPasswordPayload) => {
  return API.put('/carriers/change-password', {
    old_password: oldPassword,
    new_password: newPassword
  })
}
