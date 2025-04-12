'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { type SyntheticEvent, useState } from 'react'
import Link from 'next/link'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, EmailField, PasswordField } from '@/shared/ui'

import { ROUTE_NAMES } from '@/shared/config'
import { useCarrierSignIn } from '../../model/useCarrierSignIn'
import { useShipperSignIn } from '../../model/useShipperSignIn'

import classes from './SignInForm.module.scss'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type FormSchema = z.infer<typeof schema>

export const SignInForm = () => {
  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit } = useFormProps

  const [tab, setTab] = useState(0)
  const carriegSignIn = useCarrierSignIn()
  const shipperSignIn = useShipperSignIn()

  const onTabChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue)
  }

  const onFormSubmit = ({ email, password }: FormSchema) => {
    if (tab === 0) {
      shipperSignIn.mutate({ email, password })
    }

    if (tab === 1) {
      carriegSignIn.mutate({ email, password })
    }
  }

  return (
    <FormProvider {...useFormProps}>
      <form className={classes.signInForm} onSubmit={handleSubmit(onFormSubmit)}>
        <Tabs className={classes.tabs} value={tab} onChange={onTabChange}>
          <Tab label='Shipper' />
          <Tab label='Carrier' />
        </Tabs>

        <div className={classes.fields}>
          <EmailField />

          <PasswordField name='password' placeholder='Password' withIcon />
        </div>

        <Link href={ROUTE_NAMES.PASSWORD_RESTORE}>Do you remember the password?</Link>

        <Button fullWidth type='submit' className={classes.submitButton}>
          Sign In
        </Button>

        <p>No account? Create a new one</p>
      </form>
    </FormProvider>
  )
}
