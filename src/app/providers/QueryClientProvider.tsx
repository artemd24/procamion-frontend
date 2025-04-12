'use client'

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider
} from '@tanstack/react-query'
import { isAxiosError, type AxiosError } from 'axios'
import { toast } from 'react-toastify'

type ErrorDetail = {
  ctx: {
    reason: string
  }
  input: string
  loc: string[]
  msg: string
  typr: string
}

type Error = {
  detail: string | ErrorDetail[]
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    },
    mutations: {
      onError: (err) => {
        if (isAxiosError(err)) {
          handleAxiosError(err)
        } else {
          toast.error('An unknown error has occurred')
        }

        return err
      }
    }
  }
})

function handleAxiosError(err: AxiosError<Error>) {
  if (!err.response || !err.response.data.detail) {
    toast.error('An unknown error has occurred')
    return
  }

  const errorCode = err.response.status
  const { detail } = err.response.data

  if (errorCode === 403 || errorCode === 500) {
    window.location.href = '/server-error'
    return
  }

  if (typeof detail === 'string') {
    toast.error(detail)
    return
  }

  if (Array.isArray(detail)) {
    detail.forEach(({ loc, msg }) => {
      toast.error(`${loc.pop()} ${msg}`)
    })
  }
}

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>
}
