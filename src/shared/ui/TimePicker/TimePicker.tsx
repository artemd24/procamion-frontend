'use client'

import cn from 'classnames'
import {
  MobileTimePicker as MuiTimePicker,
  type MobileTimePickerProps as MuiTimePickerProps
} from '@mui/x-date-pickers/MobileTimePicker'
import { Controller, useFormContext } from 'react-hook-form'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import dayjs from 'dayjs'

import classes from './TimePicker.module.scss'

type TimePickerProps = {
  name: string
  required?: boolean
} & MuiTimePickerProps<Dayjs>

export const TimePicker = ({ name, required = true }: TimePickerProps) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      rules={{ required }}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <MuiTimePicker
            open={open}
            className={classes.timePicker}
            inputRef={ref}
            slotProps={{
              dialog: {
                classes: {
                  root: classes.dialog
                }
              },
              actionBar: {
                className: classes.actionBar
              },
              toolbar: {
                className: classes.toolbar
              },
              textField: {
                placeholder: 'Time',
                className: cn(classes.textField, {
                  [classes.error]: Boolean(error)
                }),
                onClick: () => {
                  setOpen(true)
                }
              }
            }}
            value={dayjs(value).isValid() ? dayjs(value) : null}
            onChange={(value) => {
              if (!dayjs(value).isValid()) return onChange(value)

              return onChange(new Date(dayjs(value).toDate()).toISOString().slice(11))
            }}
            onClose={() => {
              setOpen(false)
            }}
          />
        )
      }}
    />
  )
}
