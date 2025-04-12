export type EditCarrierInfoPayload = {
  firstName: string
  lastName: string
  language: string
  country: string
  city: string
  drivingLicense: string
  drivingLicenseExpireDate: string
  drivingLicenseReceiptDate: string
  email: string
  phone: string
}

export type ChangeCarrierPasswordPayload = {
  oldPassword: string
  newPassword: string
}
