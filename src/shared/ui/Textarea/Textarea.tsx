'use client'

import { Controller, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import MuiTextarea, {
  type TextareaAutosizeProps as MuiTextareaProps
} from '@mui/material/TextareaAutosize'

import classes from './Textarea.module.scss'

type TextareaProps = {
  name: string
  required?: boolean
  maxLength?: number
} & MuiTextareaProps

export const Textarea = ({
  name,
  required = true,
  maxLength = 500,
  className,
  ...props
}: TextareaProps) => {
  const { control, watch } = useFormContext()

  const valueLength = watch(name) ? watch(name).length : 0

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      rules={{ required }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={classes.textareaContainer}>
            <MuiTextarea
              className={cn(classes.textareaField, className, {
                [classes.error]: Boolean(error)
              })}
              {...props}
              {...field}
              onChange={(e) => {
                const valueLength = e.target.value.length

                if (valueLength > maxLength) {
                  return
                }

                return field.onChange(e)
              }}
            />
            {valueLength === 0 ? (
              <div className={classes.maxSymbols}>{maxLength} Max</div>
            ) : (
              <div className={classes.maxSymbols}>
                {valueLength} / {maxLength}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
