'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { usePlacesWidget } from 'react-google-autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import cn from 'classnames'

import { TextField } from '../TextField/TextField'

import classes from './PlaceAutocomplete.module.scss'
import './PlaceAutocomplete.scss'

type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

type PlaceAutocompleteProps = {
  name: string
  placeholder?: string
  cityOnly?: boolean
}

export const PlaceAutocomplete = ({
  name,
  placeholder,
  cityOnly = false
}: PlaceAutocompleteProps) => {
  const { setValue, watch, getFieldState } = useFormContext()

  const { error } = getFieldState(name)
  const countryCode = watch(`${name}CountryCode`)
  const addressWatch = watch(name)

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      const { formatted_address: address } = place
      const addressComponents = place.address_components as AddressComponent[]
      const countryPart = addressComponents.find(({ types }) => types.includes('country'))
      const cityPart = addressComponents.find(({ types }) => types.includes('locality'))
      const postalCodePart = addressComponents.find(({ types }) => types.includes('postal_code'))

      setValue(name, address)
      setValue(`${name}CountryCode`, countryPart?.short_name || '')
      setValue(`${name}Country`, countryPart?.long_name || '')
      setValue(`${name}City`, cityPart?.long_name || '')
      setValue(`${name}PostalCode`, postalCodePart?.long_name || '')
    },
    options: {
      // locality - city
      types: cityOnly ? ['locality', 'country'] : ['address']
    },
    language: 'en'
  })

  const clearFields = () => {
    setValue(name, '')
    setValue(`${name}Country`, '')
    setValue(`${name}CountryCode`, '')
    setValue(`${name}City`, '')
    setValue(`${name}PostalCode`, '')
  }

  return (
    <div
      className={cn(classes.placeAutocomplete, {
        [classes.withValue]: Boolean(countryCode),
        [classes.error]: Boolean(error)
      })}
    >
      <TextField
        name={name}
        placeholder={placeholder}
        InputProps={{
          inputRef: materialRef,
          startAdornment: countryCode ? (
            <InputAdornment position='start' className={classes.countryStartAdornment}>
              <Image
                width={24}
                height={24}
                src={`https://flagsapi.com/${countryCode}/flat/24.png`}
                alt={countryCode}
              />
            </InputAdornment>
          ) : null
        }}
        onChange={({ target: { value } }) => {
          if (value === '') {
            clearFields()
          }
        }}
      />

      {addressWatch ? (
        <button className={classes.clearButton} onClick={clearFields}>
          <Image width={18} height={18} src='/icons/cross-circle.svg' alt='close' />
        </button>
      ) : null}

      <TextField
        rules={{ required: false }}
        name={`${name}Country`}
        hidden
        className={classes.hiddenField}
      />

      <TextField
        rules={{ required: false }}
        name={`${name}CountryCode`}
        hidden
        className={classes.hiddenField}
      />

      <TextField
        rules={{ required: false }}
        name={`${name}City`}
        hidden
        className={classes.hiddenField}
      />

      {!cityOnly ? (
        <TextField
          rules={{ required: false }}
          name={`${name}PostalCode`}
          hidden
          className={classes.hiddenField}
        />
      ) : null}
    </div>
  )
}
