import Typography from '@mui/material/Typography'

import { PasswordRestoreForm } from '@/features/auth'

import classes from './auth.module.scss'

export const PasswordRestorePage = () => {
  return (
    <div className={classes.page}>
      <Typography variant='h1' textAlign='center' fontSize={20} fontWeight={500}>
        Forgot your password?
      </Typography>

      <div className={classes.form}>
        <PasswordRestoreForm />
      </div>
    </div>
  )
}
