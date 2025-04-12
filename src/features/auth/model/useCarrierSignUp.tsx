'use client'

import { useMutation } from '@tanstack/react-query'

import { carrierSignUp } from '../api/auth'
import { useCarrierSignIn } from './useCarrierSignIn'

export const useCarrierSignUp = () => {
  const signIn = useCarrierSignIn()

  return useMutation({
    mutationFn: carrierSignUp,
    onSuccess: (_, { email, password }) => {
      signIn.mutate({ email, password })
    }
  })
}
