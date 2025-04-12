'use client'

import { useContext } from 'react'

import { ApplicationSearchFiltersContext } from '../providers/ApplicationSearchFiltersProvider/ApplicationSearchFiltersProvider'

export const useApplicationSearchFilters = () => {
  return useContext(ApplicationSearchFiltersContext)
}
