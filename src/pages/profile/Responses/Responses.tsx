'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { MyResponsesList } from '@/widgets/response'

import classes from './Responses.module.scss'

type TabValue = 'Active' | 'Archived'

export const ProfileResponsesPage = () => {
  const [tab, setTab] = useState<TabValue>('Active')

  return (
    <div className={classes.profileResponses}>
      <Tabs
        className={classes.tabs}
        value={tab}
        onChange={(_, tabValue) => {
          setTab(tabValue)
        }}
      >
        <Tab value='Active' label='Active' />
        <Tab value='Archived' label='Archived' />
      </Tabs>

      <div className={classes.responsesList}>
        <MyResponsesList status={tab} />
      </div>
    </div>
  )
}
