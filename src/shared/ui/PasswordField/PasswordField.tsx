'use client'

import { InputAdornment } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'

import { TextField } from '../TextField/TextField'

import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import type { FieldValues, RegisterOptions } from 'react-hook-form'

type Rules = Omit<
  RegisterOptions<FieldValues, string>,
  'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
>

type PasswordFieldProps = MuiTextFieldProps & {
  name: string
  withIcon?: boolean
  rules?: Rules
}

export const PasswordField = ({ withIcon = false, rules, ...props }: PasswordFieldProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        startAdornment: withIcon ? (
          <InputAdornment position='start'>
            <Image width={24} height={24} src='/icons/lock.svg' alt='lock' />
          </InputAdornment>
        ) : null,
        endAdornment: (
          <InputAdornment position='end'>
            <button
              type='button'
              onClick={() => {
                setPasswordVisible(!isPasswordVisible)
              }}
            >
              <Image width={24} height={24} src='/icons/eye.svg' alt='eye' />
            </button>
          </InputAdornment>
        )
      }}
    />
  )
}
