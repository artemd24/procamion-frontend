'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'

import { PlaceAutocomplete } from '@/shared/ui'

import classes from './RouteAutocomplete.module.scss'

type RouteAutocompleteProps = {
  switchPosition?: 'center' | 'end'
  cityOnly?: boolean
}

export const RouteAutocomplete = ({ switchPosition = 'end', cityOnly }: RouteAutocompleteProps) => {
  const { getValues, setValue } = useFormContext()

  const switchLocations = () => {
    const [
      departure,
      departureCountry,
      departureCity,
      departureCountryCode,
      departurePostalCode,
      arrival,
      arrivalCountry,
      arrivalCity,
      arrivalCountryCode,
      arrivalPostalCode
    ] = getValues([
      'departure',
      'departureCountry',
      'departureCity',
      'departureCountryCode',
      'departurePostalCode',
      'arrival',
      'arrivalCountry',
      'arrivalCity',
      'arrivalCountryCode',
      'arrivalPostalCode'
    ])

    setValue('departure', arrival)
    setValue('arrival', departure)

    setValue('departureCountry', arrivalCountry)
    setValue('arrivalCountry', departureCountry)

    setValue('departureCity', arrivalCity)
    setValue('arrivalCity', departureCity)

    setValue('departureCountryCode', arrivalCountryCode)
    setValue('arrivalCountryCode', departureCountryCode)

    setValue('departurePostalCode', arrivalPostalCode)
    setValue('arrivalPostalCode', departurePostalCode)
  }

  return (
    <div className={classes.routeAutocomplete}>
      <PlaceAutocomplete cityOnly={cityOnly} name='departure' placeholder='Departure' />

      <PlaceAutocomplete cityOnly={cityOnly} name='arrival' placeholder='Destination' />

      <button
        type='button'
        className={cn(classes.switchButton, {
          [classes.switchButtonCenter]: switchPosition === 'center',
          [classes.switchButtonEnd]: switchPosition === 'end'
        })}
        onClick={switchLocations}
      >
        <Image width={13.9} height={13.8} src='/icons/switch.svg' alt='switch' />
      </button>
    </div>
  )
}
