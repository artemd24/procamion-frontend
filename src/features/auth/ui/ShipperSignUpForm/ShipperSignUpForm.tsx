'use client'

import { useState } from 'react'
import { FormProvider, type SubmitErrorHandler, useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Button,
  Checkbox,
  EmailField,
  FullNameField,
  PasswordField,
  Select,
  TextField
} from '@/shared/ui'
import { PhoneEdit } from '@/features/user'

import { COUNTRIES_OPTIONS, LANGUAGES_OPTIONS } from '@/shared/const/local.const'
import { useShipperSignUp } from '../../model/useShipperSignUp'

import classes from './ShipperSignUpForm.module.scss'

const schema = z.object({
  companyName: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email(),
  password: z.string().min(6),
  agreement: z.boolean(),

  language: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  phone: z.string().min(12)
})

type FormSchema = z.infer<typeof schema>

export const ShipperSignUpForm = () => {
  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const {
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useFormProps

  const [step, setStep] = useState(0)

  const signUp = useShipperSignUp()

  const onFormSubmit = ({
    companyName,
    firstName,
    lastName,
    email,
    password,
    agreement,
    city,
    country,
    language,
    phone
  }: FormSchema) => {
    if (!agreement) return

    signUp.mutate({
      companyName,
      email,
      password,
      firstName,
      lastName,
      language,
      country,
      city,
      phone
    })
  }

  const onFormError: SubmitErrorHandler<FormSchema> = (fields, e) => {
    const firstStepFields = [
      'companyName',
      'firstName',
      'lastName',
      'email',
      'password',
      'agreement'
    ]
    const isErrorInFirstStep = Object.keys(fields).some((fieldKey) =>
      firstStepFields.includes(fieldKey)
    )

    if (step === 0 && !isErrorInFirstStep) {
      setStep(1)
      clearErrors()
    }
  }

  return (
    <FormProvider {...useFormProps}>
      <form className={classes.form} onSubmit={handleSubmit(onFormSubmit, onFormError)}>
        {step === 0 ? (
          <>
            <div className={classes.fields}>
              <TextField placeholder='Company Name' name='companyName' />

              <FullNameField />

              <EmailField />

              <PasswordField name='password' placeholder='Password' withIcon />
            </div>

            <FormControlLabel
              className={classes.checkboxLabel}
              control={<Checkbox name='agreement' className={classes.checkbox} />}
              slotProps={{
                typography: {
                  fontSize: 12
                }
              }}
              label='I agree to the terms of use'
            />
          </>
        ) : null}

        {step === 1 ? (
          <div className={classes.infoFields}>
            <FormControl>
              <InputLabel>Language</InputLabel>

              <Select
                name='language'
                options={LANGUAGES_OPTIONS}
                placeholder='Enter your language'
              />
            </FormControl>

            <FormControl>
              <InputLabel>Country</InputLabel>

              <Select name='country' options={COUNTRIES_OPTIONS} placeholder='Enter your country' />
            </FormControl>

            <FormControl>
              <InputLabel>City</InputLabel>

              <TextField name='city' placeholder='Enter your city' />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor='phone'>Phone number</InputLabel>

              <PhoneEdit />
            </FormControl>
          </div>
        ) : null}

        <Button fullWidth type='submit' className={classes.submitButton}>
          {step === 0 ? 'Continue' : 'Sign up now'}
        </Button>

        <p>Do you have an account yet? Back to top</p>
      </form>
    </FormProvider>
  )
}
