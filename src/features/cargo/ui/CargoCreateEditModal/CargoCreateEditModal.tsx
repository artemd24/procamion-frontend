'use client'

import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { FormProvider, useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Counter, DatePicker, Modal, TextField, Textarea, TimePicker } from '@/shared/ui'
import { CurrencySelect } from '@/entities/common'
import { RouteAutocomplete } from '@/features/route'

import { Currency } from '@/shared/const/local.const'
import { useCargoCreate } from '../../model/useCargoCreate'
import { useCargoEdit } from '../../model/useCargoEdit'
import type { ApplicationInfoType } from '@/entities/application'

import classes from './CargoCreateEditModal.module.scss'
import { PlusIcon } from '../../../../../public/icons/Plus'

type TabValue = 'FTL' | 'LTL'

type CargoCreateEditModalProps = {
  cargo?: ApplicationInfoType
  inEditMode?: boolean
  open: boolean
  onClose: () => void
}

const schema = z.object({
  departure: z.string().min(1, ''),
  departureCountry: z.string().min(1, ''),
  departureCity: z.string().min(1, ''),
  departurePostalCode: z.string().min(1, ''),
  arrival: z.string().min(1, ''),
  arrivalCountry: z.string().min(1, ''),
  arrivalCity: z.string().min(1, ''),
  arrivalPostalCode: z.string().min(1, ''),
  departureDate: z.string().nullable(),
  departureDateTime: z.string().nullable(),
  palletsNumber: z
    .number({ message: '' })
    .min(1, '')
    .max(19, 'The number of pallets cannot be more than 19')
    .optional(),
  temperature: z
    .number({ message: '' })
    .min(-20, 'The temperature cannot be less than 20 degrees Celsius')
    .max(100, 'The temperature cannot be higher than 100 degrees Celsius'),
  ftlPrice: z.string().optional(),
  ltlPrice: z.string().optional(),
  totalPrice: z.string().optional(),
  comment: z.string().min(1, ''),
  currency: z.union([z.literal(Currency.EUR), z.literal(Currency.USD), z.literal(Currency.MAD)])
})

type FormSchema = z.infer<typeof schema>

export const CargoCreateEditModal = ({
  cargo,
  inEditMode = false,
  open,
  onClose
}: CargoCreateEditModalProps) => {
  const [tab, setTab] = useState<TabValue>('FTL')
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
    reset,
    watch,
    setValue
  } = useFormProps

  const palletsNumberWatch = watch('palletsNumber')
  const ltlPriceWatch = watch('ltlPrice')

  const locationErrors = [
    errors.departureCity,
    errors.departureCountry,
    errors.departurePostalCode,
    errors.arrivalCity,
    errors.arrivalCountry,
    errors.arrivalPostalCode
  ]
  const haveLocationError = Object.values(locationErrors).filter((value) => Boolean(value))

  const { mutate: createCargo, isPending: cargoCreateInProcess } = useCargoCreate({
    onSuccess: () => {
      reset()
      onClose()
    }
  })
  const { mutate: editCargo, isPending: cargoEditInProcess } = useCargoEdit({
    onSuccess: () => {
      reset()
      onClose()
    }
  })

  useEffect(() => {
    if (!cargo) return
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
    } = cargo

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
  }, [cargo])

  useEffect(() => {
    if (!ltlPriceWatch || !palletsNumberWatch) {
      setValue('totalPrice', '')
      return
    }

    setValue('totalPrice', String(palletsNumberWatch * Number(ltlPriceWatch)))
  }, [palletsNumberWatch, ltlPriceWatch])

  const onFormSubmit = ({
    departure,
    departureCountry,
    departureCity,
    arrival,
    arrivalCountry,
    arrivalCity,
    departureDateTime,
    departureDate,
    palletsNumber,
    temperature,
    ftlPrice,
    ltlPrice,
    totalPrice,
    comment,
    currency
  }: FormSchema) => {
    if (tab === 'LTL') {
      if (!palletsNumber) {
        setError('palletsNumber', { message: '' })
        return
      }

      if (!ltlPrice) {
        setError('ltlPrice', { message: '' })
        return
      }

      if (!totalPrice) {
        setError('totalPrice', { message: '' })
        return
      }
    }

    if (tab === 'FTL') {
      if (!ftlPrice) {
        setError('ftlPrice', { message: '' })
        return
      }
    }

    const cargoData = {
      type: tab,
      countryFrom: departureCountry,
      cityFrom: departureCity,
      addressFrom: departure,
      countryTo: arrivalCountry,
      cityTo: arrivalCity,
      addressTo: arrival,
      departureDate: departureDate ?? null,
      departureDateTime: departureDateTime ?? null,
      palletsNumber: tab === 'FTL' ? 19 : Number(palletsNumber),
      temperature: Number(temperature),
      ftlPrice: tab === 'FTL' ? parseInt(ftlPrice as string) : parseInt(totalPrice as string),
      ltlPrice:
        tab === 'FTL' && ftlPrice
          ? Math.ceil(parseInt(ftlPrice) / 19)
          : parseInt(ltlPrice as string),
      description: comment,
      currency
    }

    if (inEditMode && cargo?.id) {
      editCargo({
        cargoId: cargo.id,
        cargoData
      })
      return
    }

    createCargo(cargoData)
  }

  return (
    <Modal
      title={inEditMode ? 'Edit cargo' : 'Create cargo'}
      open={open}
      className={classes.cargoCreateEditModal}
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
            <Tab value='LTL' label='LTL' />
          </Tabs>

          <div className={classes.routeAndDate}>
            <div>
              <p className={classes.label}>Select a route</p>

              <RouteAutocomplete switchPosition='center' />

              {haveLocationError.length ? (
                <p className={classes.error}>
                  You must select a full address with postal code for the route
                </p>
              ) : null}
            </div>

            <div className={classes.date}>
              <div className={classes.dateTimeRow}>
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
                  You can omit the date, this will mean that you are ready to pick up the cargo in
                  the near future
                </span>
              </div>

              <div className={classes.dateTimeRow}>
                <TimePicker required={false} name='departureDateTime' />

                <span>Ready to ship after the specified time</span>
              </div>
            </div>
          </div>

          <div className={classes.options}>
            <div className={classes.temperatureAndPallets}>
              {tab === 'LTL' ? (
                <FormControl>
                  <InputLabel className={classes.label} htmlFor='palletsNumber'>
                    Number of pallets
                  </InputLabel>

                  <div className={classes.temperatureFieldRow}>
                    <TextField
                      id='palletsNumber'
                      type='number'
                      name='palletsNumber'
                      placeholder='19'
                    />
                    <span>pallet</span>
                  </div>
                </FormControl>
              ) : null}

              <FormControl>
                <InputLabel className={classes.label}>Temperature mode</InputLabel>

                <div className={classes.temperatureFieldRow}>
                  <Counter name='temperature' minValue={-20} maxValue={100} placeholder='+ 8' />
                  <span>°C</span>
                </div>
              </FormControl>
            </div>

            <div className={classes.price}>
              {tab === 'FTL' ? (
                <FormControl>
                  <InputLabel className={classes.label} htmlFor='ftlPrice'>
                    The price
                  </InputLabel>

                  <div className={classes.priceFieldRow}>
                    <span>FTL</span>
                    <TextField
                      className={classes.priceField}
                      id='ftlPrice'
                      name='ftlPrice'
                      placeholder='1000'
                    />
                    <CurrencySelect />
                  </div>
                </FormControl>
              ) : null}

              {tab === 'LTL' ? (
                <>
                  <FormControl>
                    <InputLabel className={classes.label} htmlFor='ltlPrice'>
                      The price
                    </InputLabel>

                    <div className={classes.priceFieldRow}>
                      <span>LTL</span>
                      <TextField
                        className={classes.priceField}
                        id='ltlPrice'
                        name='ltlPrice'
                        placeholder='1000 / pal'
                      />
                      <CurrencySelect />
                    </div>
                  </FormControl>

                  <FormControl className={classes.totalPrice}>
                    <InputLabel className={classes.label} htmlFor='totalPrice'>
                      Total price
                    </InputLabel>

                    <TextField id='totalPrice' name='totalPrice' placeholder='19 000' />
                  </FormControl>
                </>
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
                isLoading={cargoEditInProcess}
                type='button'
                color='secondary'
                size='small'
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button isLoading={cargoEditInProcess} type='submit' size='small'>
                Save
              </Button>
            </div>
          ) : (
            <Button
              isLoading={cargoCreateInProcess}
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
