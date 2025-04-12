'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Button, TextField } from '@/shared/ui'

import classes from './EmailEdit.module.scss'

export const EmailEdit = () => {
  const [isFieldDisabled, setFieldDisabled] = useState(true)

  return (
    <div className={classes.emailEdit}>
      <TextField
        id='email'
        type='email'
        name='email'
        disabled={isFieldDisabled}
        className={classes.emailField}
      />

      <Button
        variant='outlined'
        type='button'
        onClick={() => {
          setFieldDisabled(!isFieldDisabled)
        }}
      >
        <Image width={16} height={16} src='/icons/pen.svg' alt='pen' />
      </Button>
    </div>
  )
}
