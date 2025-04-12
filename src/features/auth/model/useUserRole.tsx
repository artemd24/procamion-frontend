import { useQuery } from '@tanstack/react-query'

import { getUserRole } from '../api/auth'

type UseUserRoleProps = {
  enabled: boolean
}

export const useUserRole = ({ enabled }: UseUserRoleProps) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserRole,
    enabled
  })
}
