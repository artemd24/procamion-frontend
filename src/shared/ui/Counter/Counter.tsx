'use client'

import { useFormContext } from 'react-hook-form'
import { TextField, type TextFieldProps } from '../TextField/TextField'

import classes from './Counter.module.scss'
import { PlusIcon } from '../../../../public/icons/Plus'
import { MinusIcon } from '../../../../public/icons/Minus'

type CounterProps = {
  minValue?: number
  maxValue?: number
} & TextFieldProps

export const Counter = ({ minValue, maxValue, ...props }: CounterProps) => {
  const { setValue, getValues } = useFormContext()

  const decreaseValue = () => {
    const currentValue = Number(getValues(props.name))
    const nextValue = currentValue - 1

    if (minValue && currentValue > minValue) {
      setValue(props.name, nextValue)
      return
    }

    if (!minValue) {
      setValue(props.name, nextValue)
    }
  }

  const increaseValue = () => {
    const currentValue = Number(getValues(props.name))
    const nextValue = currentValue + 1

    if (maxValue && currentValue < maxValue) {
      setValue(props.name, nextValue)
      return
    }

    if (!maxValue) {
      setValue(props.name, nextValue)
    }
  }

  return (
    <div className={classes.counter}>
      <TextField
        {...props}
        type='number'
        InputProps={{
          startAdornment: (
            <button type='button' onClick={decreaseValue}>
              <MinusIcon />
            </button>
          ),
          endAdornment: (
            <button type='button' onClick={increaseValue}>
              <PlusIcon />
            </button>
          )
        }}
      />
    </div>
  )
}
