'use client'

import { useState } from 'react'
import cn from 'classnames'

import classes from './DemoRequestForm.module.scss'

type Variant = 'black' | 'white'

type DemoRequestFormProps = {
  variant: Variant
}

export const DemoRequestForm = ({ variant = 'white' }: DemoRequestFormProps) => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Send the form data to the API route
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        console.log('Form submitted successfully')
      } else {
        console.error('Form submission failed')
      }

      setEmail('')
    } catch (error) {
      setEmail('')

      console.error(error)
    }
  }

  return (
    <form
      className={cn(classes.demoRequestForm, {
        [classes[variant]]: true
      })}
      onSubmit={handleSubmit}
    >
      <input
        type='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
        required
      />

      <button type='submit'>Send</button>
    </form>
  )
}
