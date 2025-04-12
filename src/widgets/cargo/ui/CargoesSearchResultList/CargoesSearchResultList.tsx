'use client'

import cn from 'classnames'
import React, { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

import { useCargoesList } from '@/entities/cargo'
import { Pagination } from '@/shared/ui'
import { ApplicationInfo, type ApplicationInfoType } from '@/entities/application'
import { ApplicationResponseModal, useApplicationSearchFilters } from '@/widgets/application'

import { useUser } from '@/shared/hooks/useUser'

import classes from './CargoesSearchResultList.module.scss'

export const CargoesSearchResultList = () => {
  const PAGE_ITEMS_SIZE = 8

  const [page, setPage] = useState(1)
  const [selectedCargoData, setSelectedCargoData] = useState<ApplicationInfoType | null>(null)

  const { userRole } = useUser()
  const { filters } = useApplicationSearchFilters()
  const { data: cargoesData, isLoading: isCargoesLoading } = useCargoesList({
    filters,
    page,
    pageSize: PAGE_ITEMS_SIZE
  })

  return (
    <div className={classes.cargoesSearchResultList}>
      <ul className={classes.cargoesList}>
        {cargoesData && !isCargoesLoading
          ? cargoesData.cargoesList.map((cargo) => {
              return (
                <li
                  key={cargo.id}
                  onClick={() => {
                    setSelectedCargoData(cargo)
                  }}
                >
                  <div className={cn('card', 'pvMedium')}>
                    <ApplicationInfo application={cargo} />
                  </div>
                </li>
              )
            })
          : null}

        {isCargoesLoading
          ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
              return (
                <li key={idx}>
                  <Skeleton height={108} />
                </li>
              )
            })
          : null}
      </ul>

      {cargoesData && cargoesData.cargoesList.length === 0 && !isCargoesLoading ? (
        <p className='noData'>Cargoes not found</p>
      ) : null}

      {selectedCargoData ? (
        <ApplicationResponseModal
          type='Cargo'
          open={true}
          application={selectedCargoData}
          isResponseDisabled={userRole === 'SHIPPER'}
          onClose={() => {
            setSelectedCargoData(null)
          }}
        />
      ) : null}

      <div className={classes.pagination}>
        <Pagination
          isLoading={isCargoesLoading}
          currentPage={page}
          totalPages={cargoesData?.pagesNumber}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
