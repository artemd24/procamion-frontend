import Typography from '@mui/material/Typography'

import { NewPasswordForm } from '@/features/auth'

import classes from './auth.module.scss'

type NewPasswordProps = {}

export const NewPasswordPage = ({}: NewPasswordProps) => {
  return (
    <div className={classes.page}>
      <Typography variant='h1' textAlign='center' fontSize={20} fontWeight={500}>
        Restoring access
      </Typography>

      <div className={classes.form}>
        <NewPasswordForm />
      </div>
    </div>
  )
}
