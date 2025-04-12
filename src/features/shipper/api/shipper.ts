import { API } from '@/shared/api'

import { ChangeShipperPasswordPayload, EditShipperInfoPayload } from './shipper.types'

export const editShipperInfo = ({
  city,
  companyName,
  country,
  email,
  firstName,
  language,
  lastName,
  phone
}: EditShipperInfoPayload) => {
  return API.patch('/shippers', {
    first_name: firstName,
    last_name: lastName,
    phone_number: phone,
    email,
    company_name: companyName,
    language,
    country,
    city
  })
}

export const changeShipperPassword = ({
  oldPassword,
  newPassword
}: ChangeShipperPasswordPayload) => {
  return API.put('/shippers/change-password', {
    old_password: oldPassword,
    new_password: newPassword
  })
}
