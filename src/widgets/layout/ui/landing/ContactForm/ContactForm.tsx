import { useState } from 'react'

import classes from './ContactForm.module.scss'

type ContactFormProps = {
  onClose: () => void
}

const initialFormState = {
  name: '',
  email: '',
  message: ''
}

export const ContactForm = ({ onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState(initialFormState)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Send the form data to the API route
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // const responseMail = await fetch('/api/mail', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully')
      } else {
        // Handle error
        console.log(response.status)
        console.error('Form submission failed')
      }

      setFormData(initialFormState)
      onClose()
      setIsCompleted(true)
    } catch (error) {
      setFormData(initialFormState)
      console.error(error)
    }
  }

  return isCompleted ? (
    <div className={classes.completeContainer}>
      <h2>Thank you for your feedback!</h2>
      <h3>We will contact you shortly</h3>
    </div>
  ) : (
    <div className={classes.formContainer}>
      <h2>Contact us</h2>
      <h3>
        Fill out this simple form <br /> for feedback
      </h3>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.row}>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className={classes.row}>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className={classes.row}>
          <input
            id='message'
            name='message'
            placeholder='Comment'
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <div>
          <button className={classes.submitButton} type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
