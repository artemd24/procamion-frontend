'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { Button, EmailField } from '@/shared/ui'

import classes from './PasswordRestoreForm.module.scss'

type PasswordRestoreFormProps = {}

export const PasswordRestoreForm = ({}: PasswordRestoreFormProps) => {
  const useFormProps = useForm()

  return (
    <FormProvider {...useFormProps}>
      <form className={classes.passwordRestoreForm}>
        <p>Please enter your email address. We will send you a letter to reset your password.</p>

        <EmailField />

        <Button fullWidth type='submit'>
          Send
        </Button>
      </form>
    </FormProvider>
  )
}
