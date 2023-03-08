import { useContext } from 'react'
import type { PaginationContextModel } from 'context/paginationContext'
import { PaginationContext } from 'context/paginationContext'

export function usePagination(): PaginationContextModel {
  const context = useContext(PaginationContext)
  if (
    typeof context === 'undefined' ||
    context === null ||
    !context ||
    Object.values(context).length === 0
  )
    throw new Error('There is no Pagination provider')
  return context
}
