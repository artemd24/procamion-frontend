import { RouteResponse } from '../api/response.types'

export const transfromRouteResponse = (response: RouteResponse) => {
  const { id, created_at: createDate, updated_at: updateDate, shipper, message } = response

  return {
    id,
    createDate,
    updateDate,
    message,
    user: {
      id: shipper.id,
      firstName: shipper.first_name,
      lastName: shipper.last_name
    }
  }
}
