'use client'

import { SliderProps as MuiSliderProps } from '@mui/base/Slider'
import { useFormContext } from 'react-hook-form'
import type { ChangeEvent } from 'react'

import { Slider } from '../Slider/Slider'
import { TextFieldUncontrolled } from '../TextField/TextField'

import classes from './SliderWithInputs.module.scss'

type SliderWithInputsProps = Omit<MuiSliderProps, 'onChange'> & {
  name: string
  required?: boolean
  startPlaceholder?: string
  endPlaceholder?: string
}

export const SliderWithInputs = ({
  name,
  required,
  startPlaceholder,
  endPlaceholder,
  ...props
}: SliderWithInputsProps) => {
  const { setValue, watch } = useFormContext()

  const [start, end] = watch(name) as [number, number | undefined]

  const onStartChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(name, [parseInt(value), end])
  }

  const onEndChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(name, [start, parseInt(value)])
  }

  return (
    <div className={classes.sliderWithInputs}>
      <TextFieldUncontrolled
        name={`${name}Start`}
        placeholder={startPlaceholder}
        value={start || ''}
        onChange={onStartChange}
      />

      <Slider name={name} required={required} {...props} />

      <TextFieldUncontrolled
        name={`${name}End`}
        placeholder={endPlaceholder}
        value={end || ''}
        onChange={onEndChange}
      />
    </div>
  )
}
