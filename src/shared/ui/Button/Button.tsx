import cn from 'classnames'
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import classes from './Button.module.scss'

type ButtonProps = MuiButtonProps & {
  isLoading?: boolean
}

export const Button = ({
  children,
  className,
  isLoading = false,
  startIcon,
  ...props
}: ButtonProps) => {
  return (
    <MuiButton
      color='primary'
      variant='contained'
      size='medium'
      startIcon={!isLoading ? startIcon : null}
      {...props}
      classes={{
        root: cn(classes.button, className)
      }}
    >
      {!isLoading ? (
        children
      ) : (
        <CircularProgress
          classes={{
            root: classes.spinner
          }}
        />
      )}
    </MuiButton>
  )
}
