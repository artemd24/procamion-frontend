import { CargoResponse } from '../api/response.types'

export const transformCargoResponse = (response: CargoResponse) => {
  const { id, created_at: createDate, updated_at: updateDate, carrier, message } = response

  return {
    id,
    createDate,
    updateDate,
    message,
    user: {
      id: carrier.id,
      firstName: carrier.first_name,
      lastName: carrier.last_name
    }
  }
}
