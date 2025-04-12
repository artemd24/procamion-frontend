import Typography from '@mui/material/Typography'

import { SignInForm } from '@/features/auth'

import classes from './auth.module.scss'

export const SignInPage = () => {
  return (
    <div className={classes.page}>
      <Typography variant='h1' textAlign='center' fontSize={20} fontWeight={500}>
        Sign In
      </Typography>

      <div className={classes.form}>
        <SignInForm />
      </div>
    </div>
  )
}
