'use client'

import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useSearchParams } from 'next/navigation'

import { CargoesSearchResultList } from '@/widgets/cargo'
import { RoutesSearchResultList } from '@/widgets/route'
import { ApplicationSearchFilters, ApplicationSearchFiltersProvider } from '@/widgets/application'

import classes from './Search.module.scss'

type TabValue = 'Cargoes' | 'Routes'

export const SearchPage = () => {
  const searchParams = useSearchParams()
  const userRole = searchParams?.get('userRole')

  const [tab, setTab] = useState<TabValue>(userRole === 'carrier' ? 'Cargoes' : 'Routes')

  return (
    <ApplicationSearchFiltersProvider>
      <div>
        <div className={classes.layout}>
          <div className={classes.filters}>
            <ApplicationSearchFilters />
          </div>

          <div className={classes.content}>
            <Typography variant='h1' fontSize={32} fontWeight={700}>
              Active requests for transport
            </Typography>

            <Tabs
              className={classes.tabs}
              value={tab}
              onChange={(_, tabValue) => {
                setTab(tabValue)
              }}
            >
              <Tab value='Cargoes' label='Freight and cargoes' />
              <Tab value='Routes' label='Routes' />
            </Tabs>

            <div className={classes.mobileFilters}>
              <ApplicationSearchFilters />
            </div>

            <div className={classes.list}>
              {tab === 'Cargoes' ? <CargoesSearchResultList /> : null}
              {tab === 'Routes' ? <RoutesSearchResultList /> : null}
            </div>
          </div>
        </div>
      </div>
    </ApplicationSearchFiltersProvider>
  )
}
