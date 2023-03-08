// Description:
// context to store filter query selected from dropdown menu
// on localStorage

import React, { useEffect, useState, useContext, createContext } from 'react'
import type { ReactNode } from 'react'

interface FilterProviderProps {
  children?: ReactNode
}

interface FilterContextState {
  isLoading: boolean
}

interface IFilterProps {
  value: string
}

const LOCAL_STORAGE_KEY = 'config:filter'

const FilterStateContext = createContext<FilterContextState>({} as FilterContextState)

export interface FilterContextModel {
  value: string | null
  loading: boolean
  loadStorage: () => void
  addToStorage: ({ value }: IFilterProps) => void
}

export const FilterContext = React.createContext<FilterContextModel>({} as FilterContextModel)

export const FilterProvider = ({ children }: FilterProviderProps): JSX.Element => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(true)

  const loadStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    saved
      ? setValue(JSON.parse(saved))
      : localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify('angular'))
  }

  const setStateAndSave = ({ value }: IFilterProps) => {
    setValue(value)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
  }

  const addToStorage = ({ value }: IFilterProps) => {
    setStateAndSave({ value })
  }

  useEffect(() => {
    loadStorage()
    setLoading(false)
  }, [])

  const values = {
    value,
    loading,
    loadStorage,
    addToStorage,
  }
  return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
}

export const useUserContext = (): FilterContextState => useContext(FilterStateContext)
