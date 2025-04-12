import Typography from '@mui/material/Typography'
import Image from 'next/image'

import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/ui'

import classes from './ProfilePhotoChange.module.scss'

export const ProfilePhotoChange = () => {
  return (
    <div className={classes.profilePhotoChange}>
      <UserAvatar size='large' />

      <div className={classes.photo}>
        <Typography fontSize={18} fontWeight={500}>
          Account photo
        </Typography>

        <Typography fontSize={18} fontWeight={500}>
          JPEG or PNG, 10MB max.
        </Typography>

        <div className={classes.photoActions}>
          <Button variant='outlined' size='small' type='button'>
            Change photo
          </Button>

          <Button variant='outlined' size='small' type='button'>
            <Image width={16} height={16} src='/icons/trash.svg' alt='trash' />
          </Button>
        </div>
      </div>
    </div>
  )
}
