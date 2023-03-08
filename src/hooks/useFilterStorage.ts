import { useContext } from 'react'
import type { FilterContextModel } from 'context/filterQueryContext'
import { FilterContext } from 'context/filterQueryContext'

export function useFilterStorage(): FilterContextModel {
  const context = useContext(FilterContext)
  if (
    typeof context === 'undefined' ||
    context === null ||
    !context ||
    Object.values(context).length === 0
  )
    throw new Error('There is no Filter LocalStorage provider')
  return context
}
