'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { Button } from '@/shared/ui'
import { RouteCreateEditModal } from '@/features/route'
import { CargoCreateEditModal } from '@/features/cargo'
import { MyApplicationsList } from '@/widgets/application'

import { useUser } from '@/shared/hooks/useUser'

import classes from './Applications.module.scss'
import { PlusIcon } from '../../../../public/icons/Plus'

type TabValue = 'Active' | 'Completed'

export const ProfileApplicationsPage = () => {
  const { userRole } = useUser()

  const [tab, setTab] = useState<TabValue>('Active')
  const [isCreateApplicationModalOpen, setCreateApplicationModalOpen] = useState(false)

  return (
    <>
      <div className={classes.createButtonRow}>
        <Button
          startIcon={<PlusIcon />}
          onClick={() => {
            setCreateApplicationModalOpen(true)
          }}
        >
          {userRole === 'CARRIER' ? 'Create route' : null}
          {userRole === 'SHIPPER' ? 'Create cargo' : null}
        </Button>
      </div>

      <div className={classes.tabs}>
        <Tabs
          className={classes.tabs}
          value={tab}
          onChange={(_, tabValue) => {
            setTab(tabValue)
          }}
        >
          <Tab value='Active' label='Active' />
          <Tab value='Completed' label='Completed' />
        </Tabs>
      </div>

      <div className={classes.applicationsList}>
        <MyApplicationsList status={tab} />
      </div>

      {userRole === 'CARRIER' ? (
        <RouteCreateEditModal
          open={isCreateApplicationModalOpen}
          onClose={() => {
            setCreateApplicationModalOpen(false)
          }}
        />
      ) : null}

      {userRole === 'SHIPPER' ? (
        <CargoCreateEditModal
          open={isCreateApplicationModalOpen}
          onClose={() => {
            setCreateApplicationModalOpen(false)
          }}
        />
      ) : null}
    </>
  )
}
