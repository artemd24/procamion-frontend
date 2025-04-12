'use client'

import { type MouseEvent, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { useRouter } from 'next/navigation'

import { Pagination } from '@/shared/ui'
import {
  ApplicationInfo,
  ApplicationStatus,
  type ApplicationInfoType
} from '@/entities/application'
import { MyApplicationModal } from '../MyApplicationModal/MyApplicationModal'
import { CargoStatusBadge } from '@/entities/cargo'

import { formatDate } from '@/shared/utils'
import { useMyApplicationsList } from '../../model/useMyApplicationsList'
import { useUser } from '@/shared/hooks/useUser'

import classes from './MyApplicationsList.module.scss'

type Status = 'Active' | 'Completed'

type MyApplicationsListProps = {
  status: Status
}

export const MyApplicationsList = ({ status }: MyApplicationsListProps) => {
  const PAGE_ITEMS_SIZE = 4

  const [selectedApplication, setSelectedApplication] = useState<ApplicationInfoType>()
  const [page, setPage] = useState(1)

  const router = useRouter()
  const { userRole } = useUser()
  const { data: myApplicationsData, isLoading: isMyApplicationsLoading } = useMyApplicationsList({
    page,
    pageSize: PAGE_ITEMS_SIZE,
    status
  })

  const toOffersPage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    applicationId: string
  ) => {
    e.stopPropagation()

    router.push(`/profile/offers/${applicationId}`)
  }

  return (
    <>
      <ul className={classes.applicationsList}>
        {myApplicationsData && !isMyApplicationsLoading
          ? myApplicationsData.applicationsList.map((application) => {
              const isApplicationFinished = application.status === ApplicationStatus.FINISHED

              return (
                <li
                  key={application.id}
                  className={cn(classes.applicationCard, 'card', {
                    [classes.applicationFinished]: isApplicationFinished
                  })}
                  onClick={() => {
                    setSelectedApplication(application)
                  }}
                >
                  <ApplicationInfo
                    application={application}
                    slots={{
                      top: (
                        <div className={classes.applicationCardTop}>
                          <Typography fontSize={18} fontWeight={700}>
                            {userRole === 'CARRIER' ? 'Route' : 'Cargo'} (
                            {formatDate(application.createDate)})
                          </Typography>

                          {userRole === 'SHIPPER' && application?.status ? (
                            <CargoStatusBadge status={application.status} />
                          ) : null}
                        </div>
                      ),
                      bottom: !isApplicationFinished ? (
                        <div className={classes.applicationCardBottom}>
                          <button
                            className={classes.offersButton}
                            onClick={(e) => {
                              toOffersPage(e, application.id)
                            }}
                          >
                            Your offers{' '}
                            <Image
                              width={12}
                              height={12}
                              src='/icons/arrow-right.svg'
                              alt='arrow right'
                            />
                          </button>
                        </div>
                      ) : null
                    }}
                  />
                </li>
              )
            })
          : null}

        {isMyApplicationsLoading
          ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
              return (
                <li key={idx}>
                  <Skeleton height={215} />
                </li>
              )
            })
          : null}
      </ul>

      {myApplicationsData &&
      myApplicationsData.applicationsList.length === 0 &&
      !isMyApplicationsLoading ? (
        <p className='noData'>{userRole === 'CARRIER' ? 'Routes' : 'Cargoes'} not found</p>
      ) : null}

      {selectedApplication ? (
        <MyApplicationModal
          type={userRole === 'CARRIER' ? 'Route' : 'Cargo'}
          application={selectedApplication}
          open={true}
          onClose={() => {
            setSelectedApplication(undefined)
          }}
        />
      ) : null}

      <div className={classes.pagination}>
        <Pagination
          isLoading={isMyApplicationsLoading}
          currentPage={page}
          totalPages={myApplicationsData?.pagesNumber}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
