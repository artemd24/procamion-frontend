'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'

import { TextField } from '../TextField/TextField'

import classes from './FullNameField.module.scss'

type FullNameFieldProps = {}

export const FullNameField = ({}: FullNameFieldProps) => {
  const { getFieldState } = useFormContext()

  const firstNameError = getFieldState('firstName').error
  const lastNameError = getFieldState('lastName').error

  return (
    <div className={classes.fullNameField}>
      <div
        className={cn(classes.icon, {
          [classes.error]: Boolean(firstNameError) || Boolean(lastNameError)
        })}
      >
        <Image width={24} height={24} src='/icons/user.svg' alt='user' />
      </div>

      <div className={classes.fields}>
        <TextField name='firstName' placeholder='First Name' helperText={undefined} />

        <TextField name='lastName' placeholder='Last Name' helperText={undefined} />
      </div>
    </div>
  )
}
