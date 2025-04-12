export type EditShipperInfoPayload = {
  firstName: string
  lastName: string
  language: string
  country: string
  city: string
  companyName: string
  phone: string
  email: string
}

export type ChangeShipperPasswordPayload = {
  oldPassword: string
  newPassword: string
}
