'use client'

import { useEffect } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Button, Checkbox, Select, TextField } from '@/shared/ui'
import { ProfilePhotoChange } from '@/features/user'
import { PhoneEdit, EmailEdit } from '@/features/user'

import { COUNTRIES_OPTIONS, LANGUAGES_OPTIONS } from '@/shared/const/local.const'
import { useShipperProfileInfo } from '@/entities/shipper'
import { useShipperInfoEdit } from '../../model/useShipperInfoEdit'

import classes from './ProfileEditForm.module.scss'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  newsletterSubscribe: z.boolean().optional(),
  language: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  phone: z.string().min(12)
})

type FormSchema = z.infer<typeof schema>

type ProfileEditFormProps = {
  onEditFinish: () => void
}

export const ShipperProfileEditForm = ({ onEditFinish }: ProfileEditFormProps) => {
  const { data: shipper } = useShipperProfileInfo()
  const { mutate: editInfo, isPending: editInProcess } = useShipperInfoEdit({
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
    if (!shipper) return

    const { firstName, lastName, language, companyName, country, city, phone, email } = shipper

    reset({
      firstName,
      lastName,
      language,
      companyName,
      country,
      city,
      phone,
      email,
      newsletterSubscribe: false
    })
  }, [shipper, reset])

  const onFormSubmit = ({
    firstName,
    lastName,
    language,
    companyName,
    country,
    city,
    phone,
    email
  }: FormSchema) => {
    editInfo({
      firstName,
      lastName,
      language,
      companyName,
      country,
      city,
      phone,
      email
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
                  <InputLabel htmlFor='companyName'>Company</InputLabel>

                  <TextField id='companyName' name='companyName' placeholder='Company' />
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
