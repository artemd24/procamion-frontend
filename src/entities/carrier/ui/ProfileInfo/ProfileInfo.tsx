import cn from 'classnames'
import Typography from '@mui/material/Typography'

import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/ui'

import { useCarrierProfileInfo } from '../../model/useCarrierProfileInfo'
import { formatDate } from '@/shared/utils'

import classes from './ProfileInfo.module.scss'

type ProfileInfoProps = {
  onProfileEdit: () => void
}

export const CarrierProfileInfo = ({ onProfileEdit }: ProfileInfoProps) => {
  const { data: carrier } = useCarrierProfileInfo()

  if (!carrier) return null

  const { firstName, lastName, city, country, drivingLicense, email, language, phone } = carrier

  const phoneFormatted = `${phone.slice(0, -10)}-${phone.slice(-10, -7)}-${phone.slice(
    -7,
    -4
  )}-${phone.slice(-4)}`

  const personalInfo = [
    { label: 'Language', value: language },
    { label: 'Driving license', value: drivingLicense.number },
    {
      label: 'Date of driving license receipt',
      value: formatDate(drivingLicense.issuanceDate)
    },
    {
      label: 'Date of driving license expiration',
      value: formatDate(drivingLicense.expireDate)
    }
  ]

  const contactData = [
    { label: 'Country', value: country },
    { label: 'City', value: city },
    { label: 'Phone number', value: phoneFormatted },
    { label: 'Email', value: email }
  ]

  return (
    <div className={cn(classes.profileInfo, 'card', 'noBorder', 'brMedium')}>
      <div className={classes.top}>
        <UserAvatar size='large' />

        <div className={classes.topRight}>
          <Typography fontSize={18} fontWeight={700}>
            {firstName} {lastName}
          </Typography>

          <Typography fontWeight={500} className='colorGray'>
            Carrier
          </Typography>
        </div>
      </div>

      <div className={classes.info}>
        <div className={classes.infoColumn}>
          <Typography>Personal information</Typography>

          <ul className={classes.infoList}>
            {personalInfo.map(({ label, value }) => {
              return (
                <li key={label}>
                  <p>{label}</p>
                  <p>{value}</p>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={classes.infoColumn}>
          <Typography>Contact data</Typography>

          <ul className={classes.infoList}>
            {contactData.map(({ label, value }) => {
              return (
                <li key={label}>
                  <p>{label}</p>
                  <p>{value}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <Button type='button' size='large' onClick={onProfileEdit}>
        Edit
      </Button>
    </div>
  )
}
