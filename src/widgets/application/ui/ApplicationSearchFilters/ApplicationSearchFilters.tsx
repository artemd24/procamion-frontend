'use client'

import { useMemo, useState } from 'react'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import { ApplicationParamsFilters, ApplicationSearch } from '@/features/application'
import { useApplicationSearchFilters } from '../../model/useApplicationSearchFilters'
import { Modal } from '@/shared/ui'

import classes from './ApplicationSearchFilters.module.scss'

export const ApplicationSearchFilters = () => {
  const { filters, changeFilters } = useApplicationSearchFilters()

  const [isSearchFiltersModalOpen, setSearchFiltersModalOpen] = useState(false)

  return (
    <>
      <div className={classes.desktopContainer}>
        <ApplicationSearch onSearchSubmit={changeFilters} />

        <div className={classes.paramsFilterContainer}>
          <Typography fontSize={20} fontWeight={700}>
            Settings
          </Typography>

          <div className={classes.paramsFilter}>
            {useMemo(
              () => (
                <ApplicationParamsFilters
                  onFiltersChange={({ priceRange, palletsNumberRange, temperatureRange }) => {
                    const [priceRangeStart, priceRangeEnd] = priceRange
                    const [palletsNumberRangeStart, palletsNumberRangeEnd] = palletsNumberRange
                    const [temperatureRangeStart, temperatureRangeEnd] = temperatureRange

                    changeFilters({
                      priceRangeStart,
                      priceRangeEnd,
                      palletsNumberRangeStart,
                      palletsNumberRangeEnd,
                      temperatureRangeStart,
                      temperatureRangeEnd
                    })
                  }}
                />
              ),
              []
            )}
          </div>
        </div>
      </div>

      <div
        className={classes.mobileContainer}
        onClick={() => {
          setSearchFiltersModalOpen(true)
        }}
      >
        <span>
          {filters.departureCity ? (
            <span>
              {filters.departureCountry}, {filters.departureCity} <br />
              {filters.departureDate ? <span>{filters.departureDate}</span> : null}
            </span>
          ) : (
            <span className={classes.label}>Departure</span>
          )}
        </span>

        <Image width={12} height={12} src='./icons/arrow-right.svg' alt='arrow' />

        <span>
          {filters.arrivalCity ? (
            `${filters.arrivalCountry}, ${filters.arrivalCity}`
          ) : (
            <span className={classes.label}>Destination</span>
          )}
        </span>

        <Image width={22} height={25} src='./icons/sliders.svg' alt='sliders' />
      </div>

      <Modal
        title='Search & Filters'
        open={isSearchFiltersModalOpen}
        onClose={() => {
          setSearchFiltersModalOpen(false)
        }}
      >
        <>
          <ApplicationSearch
            onSearchSubmit={(searchData) => {
              changeFilters(searchData)
              setSearchFiltersModalOpen(false)
            }}
          />

          <div className={classes.paramsFilterContainer}>
            <Typography fontSize={20} fontWeight={700}>
              Settings
            </Typography>

            <div className={classes.paramsFilter}>
              {useMemo(
                () => (
                  <ApplicationParamsFilters
                    onFiltersChange={({ priceRange, palletsNumberRange, temperatureRange }) => {
                      const [priceRangeStart, priceRangeEnd] = priceRange
                      const [palletsNumberRangeStart, palletsNumberRangeEnd] = palletsNumberRange
                      const [temperatureRangeStart, temperatureRangeEnd] = temperatureRange

                      changeFilters({
                        priceRangeStart,
                        priceRangeEnd,
                        palletsNumberRangeStart,
                        palletsNumberRangeEnd,
                        temperatureRangeStart,
                        temperatureRangeEnd
                      })
                    }}
                  />
                ),
                []
              )}
            </div>
          </div>
        </>
      </Modal>
    </>
  )
}
