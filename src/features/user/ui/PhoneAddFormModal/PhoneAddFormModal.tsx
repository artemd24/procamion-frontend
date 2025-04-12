'use client'

import { FormProvider, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Modal, PhonePicker } from '@/shared/ui'

import classes from './PhoneAddFormModal.module.scss'

const schema = z.object({
  phone: z.string().min(12)
})

type FormSchema = z.infer<typeof schema>

type PhoneAddFormModalProps = {
  open: boolean
  onClose: () => void
  onPhoneSubmit: (phone: string) => void
}

export const PhoneAddFormModal = ({ open, onClose, onPhoneSubmit }: PhoneAddFormModalProps) => {
  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit } = useFormProps

  const onFormSubmit = ({ phone }: FormSchema) => {
    onPhoneSubmit(phone)
    onClose()
  }

  return (
    <Modal title='Add phone number' className={classes.modal} open={open} onClose={onClose}>
      <FormProvider {...useFormProps}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.stopPropagation()
            return handleSubmit(onFormSubmit)(e)
          }}
        >
          <Typography>
            Please enter your phone number. <br /> We will send you a confirmation code.
          </Typography>

          <PhonePicker name='phone' className={classes.phoneField} />

          <Button type='submit' fullWidth>
            Send
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
