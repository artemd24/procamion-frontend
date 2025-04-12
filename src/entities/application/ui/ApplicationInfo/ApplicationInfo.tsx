import { Typography } from '@mui/material'
import Image from 'next/image'
import cn from 'classnames'

import { formatDate } from '@/shared/utils'
import type { ApplicationInfoType } from '../../types/application.types'

import classes from './ApplicationInfo.module.scss'
import { ClockIcon } from '../../../../../public/icons/Clock'

type Slots = {
  top?: React.ReactNode
  bottom?: React.ReactNode
}

export type ApplicationInfoProps = {
  application: ApplicationInfoType
  slots?: Slots
}

export const ApplicationInfo = ({ application, slots }: ApplicationInfoProps) => {
  const {
    id,
    departureCountry,
    departureCity,
    departureDate,
    arrivalCountry,
    arrivalCity,
    arrivalDate,
    temperature,
    palletsNumber,
    ltlPrice,
    ftlPrice,
    currency
  } = application

  return (
    <div className={classes.container}>
      {slots?.top ? <div className={classes.slotTop}>{slots.top}</div> : null}

      <div className={classes.applicationInfo}>
        <div className={classes.column}>
          <Typography className={classes.columnTitle}>Departure</Typography>

          <div className={classes.row}>
            <span>
              <Image width={20} height={20} src='/icons/placemark.svg' alt='placemark' />
            </span>

            <span>
              {departureCountry}, {departureCity}
            </span>
          </div>

          {departureDate ? (
            <div className={classes.row}>
              <span>
                <ClockIcon />
              </span>

              <span>{formatDate(departureDate)}</span>
            </div>
          ) : null}
        </div>

        <div className={classes.column}>
          <Typography className={classes.columnTitle}>Arrival</Typography>

          <div className={classes.row}>
            <span>
              <Image width={20} height={20} src='/icons/placemark.svg' alt='placemark' />
            </span>

            <span>
              {arrivalCountry}, {arrivalCity}
            </span>
          </div>

          {arrivalDate ? (
            <div className={classes.row}>
              <span>
                <ClockIcon />
              </span>

              <span>{formatDate(arrivalDate)}</span>
            </div>
          ) : null}
        </div>

        <div className={classes.column}>
          <Typography className={classes.columnTitle}>°C and volume</Typography>

          <div className={classes.row}>
            <span>
              <Image width={20} height={20} src='/icons/temperature.svg' alt='temperature' />
            </span>

            <span>{temperature > 0 ? `+ ${temperature}` : temperature} °C</span>
          </div>

          <div className={classes.row}>
            <span>
              <Image width={20} height={20} src='/icons/pallet.svg' alt='pallet' />
            </span>

            <span>{palletsNumber} pal</span>
          </div>
        </div>

        <div className={cn(classes.column, classes.prices)}>
          <div className={classes.ftl}>
            <span>FTL</span>
            <span>
              {new Intl.NumberFormat().format(ftlPrice)} {currency}
            </span>
          </div>

          <div className={classes.ltl}>
            <span>LTL</span>
            <span>
              {new Intl.NumberFormat().format(ltlPrice)} {currency}
            </span>
            <span>/pal</span>
          </div>
        </div>
      </div>

      {slots?.bottom ? <div className={classes.slotBottom}>{slots.bottom}</div> : null}
    </div>
  )
}
