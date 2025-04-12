'use client'

import { useState } from 'react'
import { FormProvider, type SubmitErrorHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'

import {
  Button,
  Checkbox,
  DatePicker,
  EmailField,
  FullNameField,
  PasswordField,
  Select,
  TextField
} from '@/shared/ui'
import { PhoneEdit } from '@/features/user'

import { COUNTRIES_OPTIONS, LANGUAGES_OPTIONS } from '@/shared/const/local.const'
import { useCarrierSignUp } from '../../model/useCarrierSignUp'

import classes from './CarrierSignUpForm.module.scss'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(6),
  agreement: z.boolean(),

  language: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  drivingLicense: z.string().min(1, 'Required'),
  drivingLicenseReceiptDate: z.string(),
  drivingLicenseExpireDate: z.string(),
  phone: z.string().min(12)
})

type FormSchema = z.infer<typeof schema>

export const CarrierSignUpForm = () => {
  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const {
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useFormProps

  const [step, setStep] = useState(0)
  const signUp = useCarrierSignUp()

  const onFormSubmit = ({
    firstName,
    lastName,
    password,
    email,
    agreement,
    city,
    country,
    language,
    drivingLicense,
    drivingLicenseExpireDate,
    drivingLicenseReceiptDate,
    phone
  }: FormSchema) => {
    if (!agreement) return

    signUp.mutate({
      firstName,
      lastName,
      email,
      phone,
      password,
      city,
      country,
      language,
      drivingLicense: {
        number: drivingLicense,
        expireDate: drivingLicenseExpireDate,
        insuranceDate: drivingLicenseReceiptDate
      }
    })
  }

  const onFormError: SubmitErrorHandler<FormSchema> = (fields) => {
    const firstStepFields = ['email', 'firstName', 'lastName', 'password', 'agreement']
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
              <InputLabel htmlFor='drivingLicense'>Driving license</InputLabel>

              <TextField
                id='drivingLicense'
                name='drivingLicense'
                placeholder='Enter the series/number'
              />
            </FormControl>

            <div className={classes.drivingLicnseRow}>
              <FormControl>
                <InputLabel htmlFor='drivingLicenseReceiptDate'>
                  Date of driving license receipt
                </InputLabel>

                <DatePicker
                  id='drivingLicenseReceiptDate'
                  name='drivingLicenseReceiptDate'
                  disableFuture
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor='drivingLicenseExpireDate'>
                  Date of driving license expiration
                </InputLabel>

                <DatePicker id='drivingLicenseExpireDate' name='drivingLicenseExpireDate' />
              </FormControl>
            </div>

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
