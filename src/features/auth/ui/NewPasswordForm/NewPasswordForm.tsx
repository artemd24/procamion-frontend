'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TextField, Button } from '@/shared/ui'

import classes from './NewPasswordForm.module.scss'

type NewPasswordFormProps = {}

export const NewPasswordForm = ({}: NewPasswordFormProps) => {
  const useFormProps = useForm()

  return (
    <FormProvider {...useFormProps}>
      <form className={classes.newPasswordForm}>
        <p>Your password has been successfully reset. Set a new password to log in.</p>

        <div className={classes.fields}>
          <TextField name='newPassword' placeholder='New password' />

          <TextField name='newPasswordConfirm' placeholder='Repeat new password' />
        </div>

        <Button fullWidth type='submit'>
          Confirm
        </Button>
      </form>
    </FormProvider>
  )
}
