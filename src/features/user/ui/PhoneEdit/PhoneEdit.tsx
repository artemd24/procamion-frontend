'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

import { PhonePicker, Button } from '@/shared/ui'
import { PhoneAddFormModal } from '../PhoneAddFormModal/PhoneAddFormModal'
import { PhoneConfirmModal } from '../PhoneConfirmModal/PhoneConfirmModal'

import classes from './PhoneEdit.module.scss'

export const PhoneEdit = () => {
  const { getValues, setValue, getFieldState, clearErrors } = useFormContext()
  const { error: phoneError } = getFieldState('phone')
  const phone = getValues('phone')

  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)
  const [phoneForVerification, setPhoneForVerification] = useState('')

  return (
    <div className={classes.phoneEdit}>
      {Boolean(phone) ? (
        <>
          <PhonePicker id='phone' className={classes.phoneField} name='phone' disabled />

          <Button
            className={classes.editButton}
            variant='outlined'
            type='button'
            onClick={() => {
              setAddModalOpen(true)
            }}
          >
            <Image width={16} height={16} src='/icons/pen.svg' alt='pen' />
          </Button>
        </>
      ) : (
        <div>
          <button
            type='button'
            className={classes.addButton}
            onClick={() => {
              setAddModalOpen(true)
            }}
          >
            Add phone number <Image width={24} height={24} src='/icons/plus.svg' alt='plus' />
          </button>

          {phoneError ? <p className={classes.error}>You must add your phone number</p> : null}
        </div>
      )}

      <PhoneAddFormModal
        open={isAddModalOpen}
        onClose={() => {
          setAddModalOpen(false)
        }}
        onPhoneSubmit={(phone: string) => {
          setPhoneForVerification(phone)
          setConfirmModalOpen(true)
        }}
      />

      {isConfirmModalOpen ? (
        <PhoneConfirmModal
          open={isConfirmModalOpen}
          onClose={() => {
            setConfirmModalOpen(false)
          }}
          onPhoneVerify={() => {
            setConfirmModalOpen(false)
            clearErrors('phone')
            setValue('phone', phoneForVerification)
          }}
        />
      ) : null}
    </div>
  )
}
