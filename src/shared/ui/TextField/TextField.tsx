'use client'

import { Controller, type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form'
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

import './TextField.scss'

type Rules = Omit<
  RegisterOptions<FieldValues, string>,
  'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
>

export type TextFieldProps = MuiTextFieldProps & {
  name: string
  rules?: Rules
}

export const TextField = ({
  name,
  InputProps,
  rules = { required: true },
  type,
  onChange,
  ...props
}: TextFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue=''
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <MuiTextField
            fullWidth
            helperText={error && error.message !== 'Required' ? error.message : null}
            error={Boolean(error)}
            variant='outlined'
            type={type}
            {...props}
            InputProps={{
              ...InputProps,
              classes: {
                root: 'text-field-root',
                input: 'text-field-input',
                error: 'text-field-input-error',
                notchedOutline: 'text-field-fieldset'
              }
            }}
            value={field.value}
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }

              if (type === 'number') {
                return field.onChange(e.target.value ? parseInt(e.target.value) : '')
              }

              return field.onChange(e)
            }}
          />
        )
      }}
    />
  )
}

export const TextFieldUncontrolled = (props: MuiTextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      variant='outlined'
      InputProps={{
        classes: {
          root: 'text-field-root',
          input: 'text-field-input',
          error: 'text-field-input-error',
          notchedOutline: 'text-field-fieldset'
        }
      }}
      {...props}
    />
  )
}
