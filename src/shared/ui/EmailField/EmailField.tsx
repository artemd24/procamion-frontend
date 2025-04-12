import { InputAdornment } from '@mui/material'
import Image from 'next/image'

import { TextField } from '../TextField/TextField'

type EmailFieldProps = {}

export const EmailField = ({}: EmailFieldProps) => {
  return (
    <TextField
      type='email'
      name='email'
      placeholder='Email'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Image width={24} height={24} src='/icons/mail.svg' alt='mail' />
          </InputAdornment>
        )
      }}
    />
  )
}
