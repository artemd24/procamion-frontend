'use client'

import ReactCodeInput from 'react-verification-code-input'
import { Controller, useFormContext } from 'react-hook-form'

import classes from './CodeField.module.scss'

type CodeFieldProps = {
  name: string
}

export const CodeField = ({ name }: CodeFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        return (
          <ReactCodeInput
            type='number'
            fields={4}
            className={classes.codeField}
            onChange={onChange}
          />
        )
      }}
    />
  )
}
