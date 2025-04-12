'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { SliderWithInputs } from '@/shared/ui'

import debounce from 'lodash.debounce'

import classes from './ApplicationParamsFilters.module.scss'

const schema = z.object({
  priceRange: z.array(z.number().optional(), z.number().optional()),
  palletsNumberRange: z.array(z.number().optional(), z.number().optional()),
  temperatureRange: z.array(z.number().optional(), z.number().optional())
})

type FormSchema = z.infer<typeof schema>

type Filters = {
  priceRange: (number | undefined)[]
  palletsNumberRange: (number | undefined)[]
  temperatureRange: (number | undefined)[]
}

type ApplicationParamsFiltersProps = {
  onFiltersChange: (filters: Filters) => void
}

export const ApplicationParamsFilters = ({ onFiltersChange }: ApplicationParamsFiltersProps) => {
  const useFormProps = useForm<FormSchema>({
    defaultValues: {
      priceRange: [undefined, undefined],
      palletsNumberRange: [undefined, undefined],
      temperatureRange: [undefined, undefined]
    },
    resolver: zodResolver(schema)
  })
  const { watch } = useFormProps
  const filtersWatch = watch()

  const debounceOnFiltersChange = useCallback(
    debounce((filters: Filters) => {
      onFiltersChange(filters)
    }, 1500),
    []
  )

  useEffect(() => {
    const { priceRange, palletsNumberRange, temperatureRange } = filtersWatch

    debounceOnFiltersChange({
      priceRange,
      palletsNumberRange,
      temperatureRange
    })
  }, [filtersWatch])

  return (
    <FormProvider {...useFormProps}>
      <div className={classes.applicationParamsFilters}>
        <FormControl>
          <InputLabel>The price range</InputLabel>

          <div className={classes.paramFieldRow}>
            <SliderWithInputs
              name='priceRange'
              required={false}
              step={100}
              max={100_000}
              startPlaceholder='0'
              endPlaceholder='Max'
            />
          </div>
        </FormControl>

        <FormControl>
          <InputLabel>Number of pallets</InputLabel>

          <div className={classes.paramFieldRow}>
            <SliderWithInputs
              name='palletsNumberRange'
              required={false}
              min={1}
              max={20}
              startPlaceholder='3'
              endPlaceholder='20'
            />
          </div>
        </FormControl>

        <FormControl>
          <InputLabel>Temperature range</InputLabel>

          <div className={classes.paramFieldRow}>
            <SliderWithInputs
              name='temperatureRange'
              required={false}
              min={-20}
              max={100}
              startPlaceholder='0'
              endPlaceholder='Max'
            />
          </div>
        </FormControl>
      </div>
    </FormProvider>
  )
}
