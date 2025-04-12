export type GetCargoesListPayload = Partial<{
  pageNumber: number
  pageSize: number
  countryFrom: string
  countryTo: string
  cityFrom: string
  cityTo: string
  departureDate: string
  priceRangeStart: number
  priceRangeEnd: number
  palletsRangeStart: number
  palletsRangeEnd: number
  temperatureRangeStart: number
  temperatureRangeEnd: number
}>
