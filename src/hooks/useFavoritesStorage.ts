import { useContext } from 'react'
import type { FavoritesContextModel } from 'context/favoritesContext'
import { FavoritesContext } from 'context/favoritesContext'

export function useFavoritesStorage(): FavoritesContextModel {
  const context = useContext(FavoritesContext)
  if (
    typeof context === 'undefined' ||
    context === null ||
    !context ||
    Object.values(context).length === 0
  )
    throw new Error('There is no Favorites LocalStorage provider')
  return context
}
