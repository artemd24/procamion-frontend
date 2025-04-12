'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { Button, TextField } from '@/shared/ui'

import classes from './SignUpConfirmForm.module.scss'

type SignUpConfirmFormProps = {}

export const SignUpConfirmForm = ({}: SignUpConfirmFormProps) => {
  const useFormProps = useForm()

  const email = 'savlayd@mail.ru'

  return (
    <FormProvider {...useFormProps}>
      <div className={classes.signUpConfirmForm}>
        <p>
          Please enter the code sent <br /> To {email}
        </p>

        <TextField name='code' placeholder='Confirmation code' />

        <button type='button'>Request a new code</button>

        <Button fullWidth type='submit'>
          Confirm
        </Button>
      </div>
    </FormProvider>
  )
}
