'use client'

import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select'
import MuiMenuItem from '@mui/material/MenuItem'
import { Controller, useFormContext } from 'react-hook-form'

import classes from './Select.module.scss'

type Option = {
  label: string
  value: string | number | readonly string[] | undefined
}

type SelectProps = MuiSelectProps & {
  name: string
  options: Option[]
}

export const Select = ({ name, options, placeholder, ...props }: SelectProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue=''
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => {
        return (
          <MuiSelect
            {...props}
            variant='outlined'
            classes={{
              select: classes.select,
              error: classes.error
            }}
            MenuProps={{
              classes: {
                paper: classes.paper,
                list: classes.list
              }
            }}
            displayEmpty
            renderValue={(value) => {
              if (value === '') return <span className={classes.placeholder}>{placeholder}</span>

              return value
            }}
            error={Boolean(error)}
            inputRef={ref}
            value={value}
            onChange={onChange}
          >
            {options.map(({ label, value }) => {
              return (
                <MuiMenuItem key={label} value={value}>
                  {label}
                </MuiMenuItem>
              )
            })}
          </MuiSelect>
        )
      }}
    />
  )
}
