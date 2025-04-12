import Link from 'next/link'

import { Button } from '@/shared/ui'
import { ROUTE_NAMES } from '@/shared/config'

import classes from './UserEntry.module.scss'

export const UserEntry = () => {
  return (
    <div className={classes.userEntry}>
      <Link href={ROUTE_NAMES.SIGN_UP}>
        <Button size='small'>Sign Up</Button>
      </Link>

      <Link href={ROUTE_NAMES.SIGN_IN}>
        <Button size='small' color='primary'>
          Sign In
        </Button>
      </Link>
    </div>
  )
}
