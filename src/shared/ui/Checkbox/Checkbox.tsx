'use client'

import Image from 'next/image'
import cn from 'classnames'
import { Controller, useFormContext } from 'react-hook-form'
import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'

import classes from './Checkbox.module.scss'
import { CheckboxIcon } from '../../../../public/icons/Checkbox'

type CheckboxProps = MuiCheckboxProps & {
  name: string
  required?: boolean
}

export const Checkbox = ({ name, className, required = true, ...props }: CheckboxProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue={false}
      rules={{ required }}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <MuiCheckbox
            {...props}
            classes={{
              root: cn(className, {
                [classes.error]: Boolean(error)
              })
            }}
            icon={<CheckboxIcon />}
            checkedIcon={
              <Image
                width={20}
                height={20}
                src='/icons/checkbox-checked.svg'
                alt='checkbox-checked'
              />
            }
            value={field.value}
            checked={field.value}
            onChange={field.onChange}
          />
        )
      }}
    />
  )
}
