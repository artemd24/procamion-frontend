import Typography from '@mui/material/Typography'

import { SignUpConfirmForm } from '@/features/auth'

import classes from './auth.module.scss'

export const SignUpConfirmationPage = () => {
  return (
    <div className={classes.page}>
      <Typography variant='h1' textAlign='center' fontSize={20} fontWeight={500}>
        Sign up confirmation
      </Typography>

      <div className={classes.form}>
        <SignUpConfirmForm />
      </div>
    </div>
  )
}
