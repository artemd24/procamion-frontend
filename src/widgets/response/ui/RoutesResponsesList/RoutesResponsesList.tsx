'use client'

import { useState } from 'react'
import cn from 'classnames'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import { RouteResponseActions } from '@/features/response'
import { formatDate } from '@/shared/utils'
import { Pagination } from '@/shared/ui'
import { useRouteResponses } from '@/entities/response'

import classes from './RoutesResponsesList.module.scss'
import { AvatarIcon } from '../../../../../public/icons/sidebar/Avatar'

type RoutesResponsesListProps = {
  routeId: string
}

export const RoutesResponsesList = ({ routeId }: RoutesResponsesListProps) => {
  const PAGE_ITEMS_SIZE = status === 'Active' ? 5 : 8

  const [page, setPage] = useState(1)

  const { responsesData, isResponsesLoading } = useRouteResponses({
    routeId,
    page,
    pageSize: PAGE_ITEMS_SIZE
  })

  return (
    <div className={classes.routesResponsesList}>
      <ul className={classes.list}>
        {responsesData?.responses.map(({ id, shipper, application, createDate, message }) => {
          return (
            <li key={id} className={cn(classes.routeCard, 'card')}>
              <div className={classes.routeCardTop}>
                <Typography fontSize={18} fontWeight={700}>
                  Route ({formatDate(application.createDate)})
                </Typography>
              </div>

              <div className={classes.responseBody}>
                <div className={classes.responseUser}>
                  <div className={classes.responseUserAvatar}>
                    <AvatarIcon />
                  </div>

                  <div className={classes.responseUserInfo}>
                    <p>
                      {shipper.first_name} {shipper.last_name}
                    </p>
                    <p>{formatDate(createDate)}</p>
                  </div>
                </div>

                <div className={classes.responseComment}>
                  <p>Comment</p>
                  <p>{message}</p>
                </div>
              </div>

              <div className={classes.routeResponseActions}>
                <RouteResponseActions responseId={id} routeId={application.id} />
              </div>
            </li>
          )
        })}

        {isResponsesLoading
          ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
              return (
                <li key={idx}>
                  <Skeleton height={status === 'Active' ? 215 : 103} />
                </li>
              )
            })
          : null}
      </ul>

      {responsesData && responsesData?.responses.length === 0 ? (
        <p className='noData'>You have no responses to your route</p>
      ) : null}

      <div className={classes.pagination}>
        <Pagination
          isLoading={isResponsesLoading}
          currentPage={page}
          totalPages={responsesData?.pagesNumber}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
