import React, { useState, useEffect, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { pager } from 'utils/getPaginationRange'

interface PaginationProviderProps {
  children?: ReactNode
}

interface PaginationContextState {
  isLoading: boolean
}

interface IPaginationProps {
  value: string
}

export interface PaginationContextModel {
  currentPage: number
  nbPages: number | null
  pageRange: (number | string)[]
  loading: boolean
  prevPage: () => void
  nextPage: () => void
  goToPage: (page: number | string) => void
  setNbPages: (page: number) => void
}

const PaginationStateContext = createContext<PaginationContextState>({} as PaginationContextState)

export const PaginationContext = React.createContext<PaginationContextModel>(
  {} as PaginationContextModel,
)

export const PaginationProvider = ({ children }: PaginationProviderProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [nbPages, setNbPages] = useState<number>(0)
  const [pageRange, setPageRange] = useState<(string | number)[]>([])
  const [loading, setLoading] = useState(true)

  const prevPage = () => {
    if (currentPage - 1 < 0) return
    setCurrentPage(currentPage - 1)
  }
  const nextPage = () => {
    if (currentPage + 1 > nbPages) return
    setCurrentPage(currentPage + 1)
  }
  const goToPage = (page: number | string) => {
    if (typeof page === 'string') return
    setCurrentPage(page)
  }

  useEffect(() => {
    console.log('init')
    setPageRange(pager(currentPage, nbPages))
    console.log(currentPage)
    setLoading(false)
  }, [currentPage, nbPages])

  const values = {
    currentPage,
    nbPages,
    pageRange,
    prevPage,
    nextPage,
    goToPage,
    setNbPages,
    loading,
  }
  return <PaginationContext.Provider value={values}>{children}</PaginationContext.Provider>
}

export const useUserContext = (): PaginationContextState => useContext(PaginationStateContext)
