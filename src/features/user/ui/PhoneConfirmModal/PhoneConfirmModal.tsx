'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, CodeField, Modal } from '@/shared/ui'

import classes from './PhoneConfirmModal.module.scss'

const schema = z.object({
  code: z.string().min(4)
})

type FormSchema = z.infer<typeof schema>

type PhoneConfirmModalProps = {
  open: boolean
  onPhoneVerify: () => void
  onClose: () => void
}

export const PhoneConfirmModal = ({ open, onPhoneVerify, onClose }: PhoneConfirmModalProps) => {
  const COUNTDOWN_IN_SECONDS = 60

  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit } = useFormProps

  const [isResendAllowed, setResendAllowed] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(COUNTDOWN_IN_SECONDS)
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null)

  // Countdown seems buggy, but it's only in dev mode
  // cuz of debugger for useEffect in Strict mode

  useEffect(() => {
    startCountdown()
  }, [])

  useEffect(() => {
    if (resendCountdown === 0) {
      setResendAllowed(true)
      resetCountdown()
    }
  }, [resendCountdown])

  const startCountdown = () => {
    setCountdownInterval(
      setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    )
  }

  const resetCountdown = () => {
    setResendCountdown(COUNTDOWN_IN_SECONDS)

    if (countdownInterval) {
      clearInterval(countdownInterval)
    }
  }

  const resendCode = () => {
    startCountdown()
    setResendAllowed(false)
  }

  const onFormSubmit = ({ code }: FormSchema) => {
    onPhoneVerify()
  }

  return (
    <Modal
      title='Phone number confirmation'
      className={classes.modal}
      open={open}
      onClose={onClose}
    >
      <FormProvider {...useFormProps}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.stopPropagation()
            return handleSubmit(onFormSubmit)(e)
          }}
        >
          <Typography>Enter the confirmation code</Typography>

          <div className={classes.codeField}>
            <CodeField name='code' />
          </div>

          <Typography>
            {!isResendAllowed ? (
              `Send one more time (${resendCountdown})`
            ) : (
              <button onClick={resendCode}>Send one more time</button>
            )}
          </Typography>

          <Button fullWidth type='submit'>
            Confirm
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
