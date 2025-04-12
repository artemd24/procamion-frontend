'use client'

import cn from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { z } from 'zod'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Checkbox, DatePicker, Select, TextField } from '@/shared/ui'
import { ProfilePhotoChange } from '@/features/user'
import { PhoneEdit, EmailEdit } from '@/features/user'

import { COUNTRIES_OPTIONS, LANGUAGES_OPTIONS } from '@/shared/const/local.const'
import { useCarrierProfileInfo } from '@/entities/carrier'
import { useCarrierInfoEdit } from '../../model/useCarrierInfoEdit'

import classes from './ProfileEditForm.module.scss'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  newsletterSubscribe: z.boolean().optional(),
  language: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  drivingLicense: z.string().min(1, 'Required'),
  drivingLicenseReceiptDate: z.string(),
  drivingLicenseExpireDate: z.string(),
  phone: z.string().min(12)
})

type FormSchema = z.infer<typeof schema>

type ProfileEditFormProps = {
  onEditFinish: () => void
}

export const CarrierProfileEditForm = ({ onEditFinish }: ProfileEditFormProps) => {
  const { data: carrier } = useCarrierProfileInfo()
  const { mutate: editInfo, isPending: editInProcess } = useCarrierInfoEdit({
    onSuccess: () => {
      onEditFinish()
      toast.success('Your profile successfully updated')
    }
  })

  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit, reset } = useFormProps

  useEffect(() => {
    if (!carrier) return

    const { email, firstName, lastName, language, country, city, drivingLicense, phone } = carrier

    reset({
      email,
      firstName,
      lastName,
      language,
      country,
      city,
      drivingLicense: drivingLicense.number,
      drivingLicenseReceiptDate: drivingLicense.issuanceDate,
      drivingLicenseExpireDate: drivingLicense.expireDate,
      phone,
      newsletterSubscribe: false
    })
  }, [carrier, reset])

  const onFormSubmit = ({
    city,
    country,
    drivingLicense,
    drivingLicenseExpireDate,
    drivingLicenseReceiptDate,
    email,
    firstName,
    language,
    lastName,
    phone
  }: FormSchema) => {
    editInfo({
      city,
      country,
      drivingLicense,
      drivingLicenseExpireDate,
      drivingLicenseReceiptDate,
      firstName,
      language,
      lastName,
      email,
      phone
    })
  }

  return (
    <FormProvider {...useFormProps}>
      <form
        className={cn(classes.profileEditForm, 'card', 'noBorder', 'brMedium')}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <ProfilePhotoChange />

        <div className={classes.info}>
          <div className={classes.infoColumn}>
            <Typography>Personal information</Typography>

            <ul className={classes.infoList}>
              <li>
                <FormControl>
                  <InputLabel htmlFor='firstName'>Name</InputLabel>

                  <TextField id='firstName' name='firstName' placeholder='Enter your first name' />
                </FormControl>
              </li>

              <li>
                <FormControl>
                  <InputLabel htmlFor='lastName'>Surname</InputLabel>

                  <TextField id='lastName' name='lastName' placeholder='Enter your surname' />
                </FormControl>
              </li>

              <li>
                <FormControl>
                  <InputLabel>Language</InputLabel>

                  <Select
                    name='language'
                    options={LANGUAGES_OPTIONS}
                    placeholder='Select your language'
                  />
                </FormControl>
              </li>

              <li>
                <FormControl>
                  <InputLabel htmlFor='drivingLicense'>Driving license</InputLabel>

                  <TextField
                    id='drivingLicense'
                    name='drivingLicense'
                    placeholder='Enter the series/number of the driving license'
                  />
                </FormControl>
              </li>

              <li>
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
              </li>

              <li>
                <FormControl>
                  <InputLabel htmlFor='drivingLicenseExpireDate'>
                    Date of driving license expiration
                  </InputLabel>

                  <DatePicker id='drivingLicenseExpireDate' name='drivingLicenseExpireDate' />
                </FormControl>
              </li>
            </ul>
          </div>

          <div className={classes.infoColumn}>
            <Typography>Contact data</Typography>

            <ul className={classes.infoList}>
              <li>
                <FormControl>
                  <InputLabel>Country</InputLabel>

                  <Select
                    name='country'
                    options={COUNTRIES_OPTIONS}
                    placeholder='Select your country'
                  />
                </FormControl>
              </li>

              <li>
                <FormControl>
                  <InputLabel htmlFor='city'>City</InputLabel>

                  <TextField id='city' name='city' placeholder='Enter your city' />
                </FormControl>
              </li>

              <li>
                <FormControl>
                  <InputLabel htmlFor='phone'>Phone number</InputLabel>

                  <PhoneEdit />
                </FormControl>
              </li>

              <li>
                <FormControl>
                  <InputLabel htmlFor='email'>Email</InputLabel>

                  <EmailEdit />
                </FormControl>
              </li>
            </ul>

            <FormControlLabel
              className={classes.checkboxLabel}
              control={<Checkbox name='newsletterSubscribe' required={false} />}
              label='Want to subscribe newsletter'
            />
          </div>
        </div>

        <div className={classes.actions}>
          <Button size='large' color='secondary' onClick={onEditFinish}>
            Cancel
          </Button>

          <Button type='submit' size='large' isLoading={editInProcess}>
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
