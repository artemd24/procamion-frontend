'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input'
import cn from 'classnames'

import classes from './PhonePicker.module.scss'

type PhonePickerProps = MuiTelInputProps & { name: string }

export const PhonePicker = ({ name, ...props }: PhonePickerProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => {
        return (
          <MuiTelInput
            {...props}
            classes={{
              root: cn(classes.phonePicker, {
                [classes.error]: Boolean(error)
              })
            }}
            helperText={error && error.message !== 'Required' ? error.message : null}
            inputRef={ref}
            value={value}
            onChange={(value) => {
              const trimmedValue = value.split(' ').join('')
              return onChange(trimmedValue)
            }}
          />
        )
      }}
    />
  )
}
