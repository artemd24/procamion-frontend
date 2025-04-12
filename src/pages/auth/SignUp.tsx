import Typography from '@mui/material/Typography'

import { SignUpForm } from '@/features/auth'

import classes from './auth.module.scss'

export const SignUpPage = () => {
  return (
    <div className={classes.page}>
      <Typography variant='h1' textAlign='center' fontSize={20} fontWeight={500}>
        Create an account
      </Typography>

      <div className={classes.form}>
        <SignUpForm />
      </div>
    </div>
  )
}
