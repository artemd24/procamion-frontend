import Image from 'next/image'
import cn from 'classnames'

import type { ApplicationStatus } from '@/entities/application'

import classes from './CargoStatusBadge.module.scss'

type CargoStatusBadgeProps = {
  status: ApplicationStatus
}

export const CargoStatusBadge = ({ status }: CargoStatusBadgeProps) => {
  const getStatusContent = (status: ApplicationStatus) => {
    switch (status) {
      case 'OPEN':
        return (
          <>
            <Image width={12} height={12} src='/icons/checkmark-2.svg' alt='checkmark' />
            <span>Open</span>
          </>
        )
      case 'IN_WORK':
        return (
          <>
            <Image width={12} height={12} src='/icons/clock-2.svg' alt='clock' />
            <span>In work</span>
          </>
        )
      case 'FINISHED':
        return (
          <>
            <Image
              width={12}
              height={12}
              src='/icons/checkmark-double.svg'
              alt='double checkmark'
            />
            <span>Finished</span>
          </>
        )
      case 'ARCHIVED':
        return (
          <>
            <Image width={12} height={12} src='/icons/folder.svg' alt='checkmark' />
            <span>Archived</span>
          </>
        )
    }
  }

  return (
    <div
      className={cn(classes.cargoStatusBadge, {
        [classes.black]: status === 'OPEN',
        [classes.primary]: status === 'IN_WORK',
        [classes.green]: status === 'FINISHED',
        [classes.gray]: status === 'ARCHIVED'
      })}
    >
      {getStatusContent(status)}
    </div>
  )
}
