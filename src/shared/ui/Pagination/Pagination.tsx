'use client'

import cn from 'classnames'
import Skeleton from '@mui/material/Skeleton'
import { useMediaQuery } from '@mui/material'

import { usePagination } from '../../hooks/usePagination'

import classes from './Pagination.module.scss'
import Image from 'next/image'

interface PaginationProps {
  currentPage: number
  totalPages?: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages = 0,
  isLoading,
  onPageChange
}: PaginationProps) => {
  const maxWidth760 = useMediaQuery('(max-width:760px)')

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    pageSize: 1,
    siblingCount: maxWidth760 ? 1 : 2
  })

  const isPrevDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  const toPrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1)
    }
  }

  const toNextPage = () => {
    if (totalPages > currentPage) {
      onPageChange(currentPage + 1)
    }
  }

  if (isLoading) {
    return (
      <div className={classes.pagination}>
        <Skeleton className={classes.skeleton} height={48} />
      </div>
    )
  }

  if (totalPages === 0) return null

  return (
    <div className={classes.pagination}>
      <div
        className={cn(classes.pagesRow, {
          [classes.onePage]: totalPages === 1
        })}
      >
        {totalPages > 1 ? (
          <button
            className={cn(classes.navButton, {
              [classes.buttonDisabled]: isPrevDisabled
            })}
            onClick={toPrevPage}
          >
            <Image width={24} height={24} src='/icons/arrow-left.svg' alt='arrow left' />

            <span>Back</span>
          </button>
        ) : null}

        <div className={classes.pagesButtons}>
          {paginationRange?.map((pageNumber, idx) => {
            if (pageNumber === null)
              return (
                <button key={`${pageNumber}-${idx}`} className={classes.dots}>
                  &#8230;
                </button>
              )

            const isActive = currentPage === pageNumber

            return (
              <button
                key={pageNumber}
                className={cn(classes.button, {
                  [classes.buttonActive]: isActive
                })}
                onClick={() => {
                  onPageChange(pageNumber)
                }}
              >
                {pageNumber}
              </button>
            )
          })}
        </div>

        {totalPages > 1 ? (
          <button
            className={cn(classes.navButton, classes.nextButton, {
              [classes.buttonDisabled]: isNextDisabled
            })}
            onClick={toNextPage}
          >
            <span>Next</span>

            <Image width={24} height={24} src='/icons/arrow-left.svg' alt='arrow right' />
          </button>
        ) : null}
      </div>
    </div>
  )
}
