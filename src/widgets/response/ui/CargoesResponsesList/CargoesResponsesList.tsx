'use client'

import { useState } from 'react'
import cn from 'classnames'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

import { Pagination } from '@/shared/ui'
import { CargoResponseActions } from '@/features/response'
import { formatDate } from '@/shared/utils'
import { useCargoResponses } from '@/entities/response'

import classes from './CargoesResponsesList.module.scss'
import { AvatarIcon } from '../../../../../public/icons/sidebar/Avatar'

type CargoesResponsesListProps = {
  cargoId: string
}

export const CargoesResponsesList = ({ cargoId }: CargoesResponsesListProps) => {
  const PAGE_ITEMS_SIZE = 5

  const [page, setPage] = useState(1)

  const { responsesData, isResponsesLoading } = useCargoResponses({
    cargoId,
    page,
    pageSize: PAGE_ITEMS_SIZE
  })

  return (
    <div className={classes.cargoesResponsesList}>
      <ul className={classes.list}>
        {responsesData?.responses.map(({ id, createDate, carrier, message, application }) => {
          return (
            <li key={id} className={cn(classes.cargoCard, 'card')}>
              <div className={classes.cargoCardTop}>
                <Typography fontSize={18} fontWeight={700}>
                  Cargo ({formatDate(application.createDate)})
                </Typography>
              </div>

              <div className={classes.responseBody}>
                <div className={classes.responseUser}>
                  <div className={classes.responseUserAvatar}>
                    <AvatarIcon />
                  </div>

                  <div className={classes.responseUserInfo}>
                    <p>
                      {carrier.first_name} {carrier.last_name}
                    </p>
                    <p>{formatDate(createDate)}</p>
                  </div>
                </div>

                <div className={classes.responseComment}>
                  <p>Comment</p>
                  <p>{message}</p>
                </div>
              </div>

              <div className={classes.cargoResponseActions}>
                <CargoResponseActions responseId={id} cargoId={application.id} />
              </div>
            </li>
          )
        })}

        {isResponsesLoading
          ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
              return (
                <li key={idx}>
                  <Skeleton height={215} />
                </li>
              )
            })
          : null}
      </ul>

      {responsesData && responsesData.responses.length === 0 ? (
        <p className='noData'>You have no responses to your cargo</p>
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
