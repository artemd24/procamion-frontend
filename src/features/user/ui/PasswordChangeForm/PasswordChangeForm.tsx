'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import { Button, PasswordField } from '@/shared/ui'

import { useUser } from '@/shared/hooks/useUser'
import { useCarrierPasswordChange } from '@/features/carrier'
import { useShipperPasswordChange } from '@/features/shipper'

import classes from './PasswordChangeForm.module.scss'

const schema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
  newPasswordConfirm: z.string().min(6)
})

type FormSchema = z.infer<typeof schema>

export const PasswordChangeForm = () => {
  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useFormProps

  const { userRole } = useUser()
  const { mutate: changeCarrierPassword, isPending: isCarrierPasswordChangeInProcess } =
    useCarrierPasswordChange({
      onSuccess: resetAllFields
    })
  const { mutate: changeShipperPassword, isPending: isShipperPasswordChangeInProcess } =
    useShipperPasswordChange({
      onSuccess: resetAllFields
    })

  function resetAllFields() {
    reset()
  }

  const onFormSubmit = ({ oldPassword, newPassword, newPasswordConfirm }: FormSchema) => {
    if (newPassword !== newPasswordConfirm) {
      setError('newPasswordConfirm', {
        message: 'Password mismatch'
      })

      return
    }

    if (userRole === 'CARRIER') {
      changeCarrierPassword({ oldPassword, newPassword })
    }

    if (userRole === 'SHIPPER') {
      changeShipperPassword({ oldPassword, newPassword })
    }
  }

  return (
    <FormProvider {...useFormProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography fontSize={18} fontWeight={500}>
          Password settings
        </Typography>

        <div className={classes.fields}>
          <FormControl>
            <InputLabel htmlFor='oldPassword'>Old password</InputLabel>

            <PasswordField id='oldPassword' name='oldPassword' />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='newPassword'>New password</InputLabel>

            <PasswordField id='newPassword' name='newPassword' />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='newPasswordConfirm'>Repeat new password</InputLabel>

            <PasswordField
              id='newPasswordConfirm'
              name='newPasswordConfirm'
              helperText={errors.newPasswordConfirm?.message}
            />
          </FormControl>
        </div>

        <div className={classes.actions}>
          <Button size='large' color='secondary' onClick={resetAllFields}>
            Cancel
          </Button>

          <Button
            type='submit'
            size='large'
            isLoading={isCarrierPasswordChangeInProcess || isShipperPasswordChangeInProcess}
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
