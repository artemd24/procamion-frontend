'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/base/Slider'

import classes from './Slider.module.scss'

type SliderProps = MuiSliderProps & {
  name: string
  required?: boolean
  onChange?: (value: number | number[]) => void
}

export const Slider = ({ name, required, onChange, defaultValue, ...props }: SliderProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={[0, 0]}
      render={({ field: { value, ...field } }) => {
        return (
          <MuiSlider
            min={0}
            step={1}
            slotProps={{
              root: { className: classes.sliderRoot },
              rail: { className: classes.sliderRail },
              track: { className: classes.sliderTrack },
              thumb: { className: classes.sliderThumb }
            }}
            {...props}
            {...field}
            value={value}
            onChange={(e, value) => {
              if (onChange) {
                onChange(value)
              }

              return field.onChange(e)
            }}
          />
        )
      }}
    />
  )
}
