'use client'

import { type SyntheticEvent, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { ShipperSignUpForm } from '../ShipperSignUpForm/ShipperSignUpForm'
import { CarrierSignUpForm } from '../CarrierSignUpForm/CarrierSignUpForm'
import { SignUpConfirmForm } from '../SignUpConfirmForm/SignUpConfirmForm'

import classes from './SignUpForm.module.scss'

type SignUpFormProps = {}

export const SignUpForm = ({}: SignUpFormProps) => {
  const [step, setStep] = useState(0)
  const [tab, setTab] = useState(0)

  const onTabChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue)
  }

  return (
    <div>
      {step === 0 ? (
        <>
          <Tabs value={tab} onChange={onTabChange}>
            <Tab label='Shipper' />
            <Tab label='Carrier' />
          </Tabs>

          <div className={classes.tabContent}>
            {tab === 0 ? <ShipperSignUpForm /> : null}

            {tab === 1 ? <CarrierSignUpForm /> : null}
          </div>
        </>
      ) : null}

      {step === 1 ? <SignUpConfirmForm /> : null}
    </div>
  )
}
