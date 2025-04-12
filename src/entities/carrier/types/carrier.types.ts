export type CarrierProfileInfo = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  language: string
  drivingLicense: {
    number: string
    expireDate: string
    issuanceDate: string
  }
}
