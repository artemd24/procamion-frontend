'use client'

import cn from 'classnames'
import { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

import { useRoutesList } from '@/entities/route'
import { Pagination } from '@/shared/ui'
import { ApplicationInfo, type ApplicationInfoType } from '@/entities/application'
import { ApplicationResponseModal, useApplicationSearchFilters } from '@/widgets/application'

import { useUser } from '@/shared/hooks/useUser'

import classes from './RoutesSearchResultList.module.scss'

export const RoutesSearchResultList = () => {
  const PAGE_ITEMS_SIZE = 8

  const [page, setPage] = useState(1)
  const [selectedRouteData, setSelectedRouteData] = useState<ApplicationInfoType | null>(null)

  const { userRole } = useUser()
  const { filters } = useApplicationSearchFilters()
  const { data: routesData, isLoading: isRoutesLoading } = useRoutesList({
    filters,
    page,
    pageSize: PAGE_ITEMS_SIZE
  })

  return (
    <div className={classes.routesSearchResultList}>
      <div className={classes.routesSearchResultList}>
        <ul className={classes.routesList}>
          {routesData && !isRoutesLoading
            ? routesData.routesList.map((route) => {
                return (
                  <li
                    key={route.id}
                    onClick={() => {
                      setSelectedRouteData(route)
                    }}
                  >
                    <div className={cn('card', 'pvMedium')}>
                      <ApplicationInfo application={route} />
                    </div>
                  </li>
                )
              })
            : null}

          {isRoutesLoading
            ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
                return (
                  <li key={idx}>
                    <Skeleton height={108} />
                  </li>
                )
              })
            : null}
        </ul>

        {routesData && routesData.routesList.length === 0 && !isRoutesLoading ? (
          <p className='noData'>Routes not found</p>
        ) : null}

        {selectedRouteData ? (
          <ApplicationResponseModal
            type='Route'
            open={true}
            application={selectedRouteData}
            isResponseDisabled={userRole === 'CARRIER'}
            onClose={() => {
              setSelectedRouteData(null)
            }}
          />
        ) : null}

        <div className={classes.pagination}>
          <Pagination
            isLoading={isRoutesLoading}
            currentPage={page}
            totalPages={routesData?.pagesNumber}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  )
}
