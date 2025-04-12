'use client'

import { useMutation } from '@tanstack/react-query'

import { shipperSignUp } from '../api/auth'
import { useShipperSignIn } from './useShipperSignIn'

export const useShipperSignUp = () => {
  const signIn = useShipperSignIn()

  return useMutation({
    mutationFn: shipperSignUp,
    onSuccess: (_, { email, password }) => {
      signIn.mutate({ email, password })
    }
  })
}
