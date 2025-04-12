'use client'

import { FormProvider, useForm } from 'react-hook-form'
import Image from 'next/image'
import cn from 'classnames'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button, DatePicker, PlaceAutocomplete } from '@/shared/ui'

import classes from './RouteSearchForm.module.scss'
import { BoxSmallIcon } from '../../../../../../public/icons/landing/BoxSmall'
import { TruckIcon } from '../../../../../../public/icons/landing/Truck'

type UserRole = 'shipper' | 'carrier'

const schema = z.object({
  departure: z.string(),
  departureCountry: z.string(),
  departureCountryCode: z.string(),
  departureCity: z.string(),
  arrival: z.string(),
  arrivalCountry: z.string(),
  arrivalCity: z.string(),
  arrivalCountryCode: z.string(),
  departureDate: z.string().nullable().optional()
})

type FormSchema = z.infer<typeof schema>

export const RouteSearchForm = () => {
  const router = useRouter()
  const [userRole, setUserRole] = useState<UserRole>('shipper')

  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit } = useFormProps

  const onFormSubmit = ({
    departure,
    departureCountry,
    departureCity,
    departureCountryCode,
    arrival,
    arrivalCountry,
    arrivalCity,
    arrivalCountryCode,
    departureDate
  }: FormSchema) => {
    const departurePart = `departure=${departure}&departureCountry=${departureCountry}&departureCity=${departureCity}&departureCountryCode=${departureCountryCode}`
    const arrivalPart = `arrival=${arrival}&arrivalCountry=${arrivalCountry}&arrivalCity=${arrivalCity}&arrivalCountryCode=${arrivalCountryCode}`

    router.push(
      `/search?${departurePart}&${arrivalPart}&departureDate=${
        departureDate || ''
      }&userRole=${userRole}`
    )
  }

  return (
    <div>
      <div className={classes.tabsContainer}>
        <div className={classes.tabs}>
          <button
            type='button'
            className={cn({
              [classes.tabActive]: userRole === 'shipper'
            })}
            onClick={() => {
              setUserRole('shipper')
            }}
          >
            <BoxSmallIcon />
            {"I'm Shipper"}
          </button>

          <button
            type='button'
            className={cn({
              [classes.tabActive]: userRole === 'carrier'
            })}
            onClick={() => {
              setUserRole('carrier')
            }}
          >
            <TruckIcon />
            {"I'm Carrier"}
          </button>
        </div>

        <p>
          Improve your shipping income by finding new partners and as a result escape empty
          travelling
        </p>
      </div>

      <FormProvider {...useFormProps}>
        <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={classes.fields}>
            <div className={classes.field}>
              <div className={classes.icon}>
                <Image
                  src='/icons/landing/place-from.svg'
                  width={24}
                  height={24}
                  alt='place from'
                />
              </div>

              <PlaceAutocomplete cityOnly name='departure' placeholder='From' />
            </div>

            <div className={classes.field}>
              <div className={classes.icon}>
                <Image src='/icons/landing/place-to.svg' width={25} height={24} alt='place to' />
              </div>

              <PlaceAutocomplete cityOnly name='arrival' placeholder='To' />
            </div>

            <div className={cn(classes.field, classes.datePickerContainer)}>
              <div className={classes.icon}>
                <Image src='/icons/landing/date.svg' width={25} height={24} alt='date' />
              </div>

              <DatePicker name='departureDate' placeholder='Date' required={false} />
            </div>
          </div>

          <Button type='submit' size='large'>
            Search
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
