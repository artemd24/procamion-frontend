'use client'

import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { FormProvider, useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Counter, DatePicker, Modal, TextField, Textarea } from '@/shared/ui'
import { RouteAutocomplete } from '../RouteAutocomplete/RouteAutocomplete'
import { CurrencySelect } from '@/entities/common'

import { useRouteEdit } from '../../model/useRouteEdit'
import { useRouteCreate } from '../../model/useRouteCreate'
import { Currency } from '@/shared/const/local.const'
import type { ApplicationInfoType } from '@/entities/application'

import classes from './RouteCreateEditModal.module.scss'
import { PlusIcon } from '../../../../../public/icons/Plus'

type TabValue = 'FTL' | 'FTL/LTL'

type RouteCreateEditModalProps = {
  route?: ApplicationInfoType
  inEditMode?: boolean
  open: boolean
  onClose: () => void
}

const schema = z.object({
  departure: z.string().min(1, ''),
  departureCountry: z.string().min(1, ''),
  departureCity: z.string().min(1, ''),
  arrival: z.string().min(1, ''),
  arrivalCountry: z.string().min(1, ''),
  arrivalCity: z.string().min(1, ''),
  departureDate: z.string().nullable(),
  palletsNumber: z
    .number({ message: '' })
    .min(1, '')
    .max(19, 'The number of pallets cannot be more than 19')
    .optional(),
  temperature: z
    .number({ message: '' })
    .min(-20, 'The temperature cannot be less than 20 degrees Celsius')
    .max(100, 'The temperature cannot be higher than 100 degrees Celsius'),
  ftlPrice: z.string().min(1, ''),
  ltlPrice: z.string().optional(),
  comment: z.string().min(1, ''),
  currency: z.union([z.literal(Currency.EUR), z.literal(Currency.USD), z.literal(Currency.MAD)])
})

type FormSchema = z.infer<typeof schema>

export const RouteCreateEditModal = ({
  route,
  inEditMode = false,
  open,
  onClose
}: RouteCreateEditModalProps) => {
  const useFormProps = useForm<FormSchema>({
    defaultValues: {
      currency: Currency.USD
    },
    resolver: zodResolver(schema)
  })
  const {
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    resetField,
    reset
  } = useFormProps

  const [tab, setTab] = useState<TabValue>('FTL')

  const { mutate: createRoute, isPending: routeCreateInProcess } = useRouteCreate({
    onSuccess: () => {
      reset()
      onClose()
    }
  })

  const { mutate: editRoute, isPending: routeEditInProcess } = useRouteEdit({
    onSuccess: () => {
      reset()
      onClose()
    }
  })

  const locationErrors = [
    errors.departureCity,
    errors.departureCountry,
    errors.arrivalCity,
    errors.arrivalCountry
  ]
  const haveLocationError = Object.values(locationErrors).filter((value) => Boolean(value))

  useEffect(() => {
    if (!route) return
    const {
      departureCountry,
      departureCity,
      arrivalCountry,
      arrivalCity,
      departureDate,
      comment,
      currency,
      ftlPrice,
      ltlPrice,
      palletsNumber,
      temperature
    } = route

    reset({
      departure: `${departureCountry}, ${departureCity}`,
      departureCountry,
      departureCity,
      arrival: `${arrivalCountry}, ${arrivalCity}`,
      arrivalCountry,
      arrivalCity,
      departureDate,
      comment,
      currency,
      ftlPrice: String(ftlPrice),
      ltlPrice: String(ltlPrice),
      temperature,
      palletsNumber
    })
  }, [route])

  const onFormSubmit = ({
    departureCountry,
    departureCity,
    arrivalCountry,
    arrivalCity,
    departureDate,
    palletsNumber,
    temperature,
    ftlPrice,
    ltlPrice,
    comment,
    currency
  }: FormSchema) => {
    if (tab === 'FTL/LTL') {
      if (!palletsNumber) {
        setError('palletsNumber', { message: '' })
        return
      }

      if (!ltlPrice) {
        setError('ltlPrice', { message: '' })
        return
      }
    }

    const routeData = {
      countryFrom: departureCountry,
      cityFrom: departureCity,
      countryTo: arrivalCountry,
      cityTo: arrivalCity,
      departureDate: departureDate ?? null,
      palletsNumber: tab === 'FTL' ? 19 : Number(palletsNumber),
      temperature: Number(temperature),
      ftlPrice: parseInt(ftlPrice),
      ltlPrice: tab === 'FTL' ? Math.ceil(parseInt(ftlPrice) / 19) : parseInt(ltlPrice as string),
      description: comment,
      currency
    }

    if (inEditMode && route?.id) {
      editRoute({
        routeId: route.id,
        routeData
      })
      return
    }

    createRoute(routeData)
  }

  return (
    <Modal
      title={inEditMode ? 'Edit route' : 'Create route'}
      open={open}
      className={classes.routeCreateEditModal}
      onClose={onClose}
    >
      <FormProvider {...useFormProps}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Tabs
            className={classes.tabs}
            value={tab}
            onChange={(_, tabValue) => {
              clearErrors()
              resetField('palletsNumber')
              setTab(tabValue)
            }}
          >
            <Tab value='FTL' label='FTL' />
            <Tab value='FTL/LTL' label='FTL / LTL' />
          </Tabs>

          <div className={classes.routeAndDate}>
            <div>
              <p className={classes.label}>Select a route</p>

              <RouteAutocomplete cityOnly switchPosition='center' />

              {haveLocationError.length ? (
                <p className={classes.error}>You must select a country and city for the route</p>
              ) : null}
            </div>

            <div className={classes.date}>
              <FormControl>
                <InputLabel className={classes.label} htmlFor='departureDate'>
                  Departure
                </InputLabel>

                <DatePicker
                  required={false}
                  id='departureDate'
                  name='departureDate'
                  placeholder='Date'
                />
              </FormControl>

              <span>
                You can omit the date, this will mean that you are ready to pick up the cargo in the
                near future
              </span>
            </div>
          </div>

          <div className={classes.options}>
            <div className={classes.temperatureAndPallets}>
              {tab === 'FTL/LTL' ? (
                <FormControl>
                  <InputLabel className={classes.label} htmlFor='departureDate'>
                    Number of pallets
                  </InputLabel>

                  <div className={classes.temperatureFieldRow}>
                    <TextField type='number' name='palletsNumber' placeholder='19' />
                    <span>pallet</span>
                  </div>
                </FormControl>
              ) : null}

              <FormControl>
                <InputLabel className={classes.label} htmlFor='departureDate'>
                  Temperature mode
                </InputLabel>

                <div className={classes.temperatureFieldRow}>
                  <Counter name='temperature' minValue={-20} maxValue={100} placeholder='+ 8' />
                  <span>°C</span>
                </div>
              </FormControl>
            </div>

            <div className={classes.price}>
              <FormControl>
                <InputLabel className={classes.label} htmlFor='departureDate'>
                  The price
                </InputLabel>

                <div className={classes.priceFieldRow}>
                  <span>FTL</span>
                  <TextField className={classes.priceField} name='ftlPrice' placeholder='1000' />
                  <CurrencySelect />
                </div>
              </FormControl>

              {tab === 'FTL/LTL' ? (
                <div className={classes.priceFieldRow}>
                  <span>LTL</span>
                  <TextField
                    className={classes.priceField}
                    name='ltlPrice'
                    placeholder='1000 / pal'
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className={classes.comment}>
            <FormControl>
              <InputLabel className={classes.label} htmlFor='comment'>
                Comment
              </InputLabel>

              <Textarea id='comment' name='comment' placeholder='Enter comment' />
            </FormControl>
          </div>

          {inEditMode ? (
            <div className={classes.actions}>
              <Button
                isLoading={routeEditInProcess}
                type='button'
                color='secondary'
                size='small'
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button isLoading={routeEditInProcess} type='submit' size='small'>
                Save
              </Button>
            </div>
          ) : (
            <Button
              isLoading={routeCreateInProcess}
              type='submit'
              startIcon={<PlusIcon />}
              size='small'
            >
              Create
            </Button>
          )}
        </form>
      </FormProvider>
    </Modal>
  )
}
