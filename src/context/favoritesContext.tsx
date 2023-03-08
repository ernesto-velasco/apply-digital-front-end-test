import React, { useEffect, useState, useContext, createContext } from 'react'
import type { ReactNode } from 'react'

interface FavoritesProviderProps {
  children?: ReactNode
}

interface FavoritesContextState {
  isLoading: boolean
  id?: string
}

export interface IPostProps {
  storyId: number
  storyTitle: string
  author: string
  storyUrl: string
  createdAt: string
}

export interface FavoritesContextModel {
  favorites: IPostProps[] | null
  loading: boolean
  loadStorage: () => void
  addToStorage: (items: IPostProps) => void
  removeStorageById: (item: IPostProps) => void
}

const LOCAL_STORAGE_KEY = 'posts:favorites'

const FavoritesStateContext = createContext<FavoritesContextState>({} as FavoritesContextState)

export const FavoritesContext = React.createContext<FavoritesContextModel>(
  {} as FavoritesContextModel,
)

export const FavoritesProvider = ({ children }: FavoritesProviderProps): JSX.Element => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const loadStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) setFavorites(JSON.parse(saved))
  }

  const setStateAndSave = (items: any) => {
    setFavorites(items)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }

  const addToStorage = (items: IPostProps) => {
    const newItems = [...favorites, items]
    setStateAndSave(newItems)
  }

  const removeStorageById = (item: IPostProps) => {
    const newFavoriteList = favorites.filter(
      (favorite: IPostProps) => favorite.storyId !== item.storyId,
    )
    setStateAndSave(newFavoriteList)
  }

  useEffect(() => {
    loadStorage()
    setLoading(false)
  }, [])

  const values = {
    favorites,
    loading,
    loadStorage,
    addToStorage,
    removeStorageById,
  }
  return <FavoritesContext.Provider value={values}>{children}</FavoritesContext.Provider>
}

export const useUserContext = (): FavoritesContextState => useContext(FavoritesStateContext)