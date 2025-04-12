'use client'

import { CargoesResponsesList, RoutesResponsesList } from '@/widgets/response'

import { useUser } from '@/shared/hooks/useUser'

import classes from './Offers.module.scss'

export const OffersPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  const { userRole } = useUser()

  return (
    <>
      <div className={classes.responsesList}>
        {userRole === 'CARRIER' ? <RoutesResponsesList routeId={id} /> : null}
        {userRole === 'SHIPPER' ? <CargoesResponsesList cargoId={id} /> : null}
      </div>
    </>
  )
}
