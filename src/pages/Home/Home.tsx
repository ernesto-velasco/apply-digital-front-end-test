// Description:
// Home page that contains news post fetched from hn.algolio.com api

import styles from './home.module.css'
import { DropdownMenu, Pagination, PostCard } from 'components'
import { useFavoritesStorage } from 'hooks/useFavoritesStorage'
import useFetch from 'hooks/useFetch'
import { useFilterStorage } from 'hooks/useFilterStorage'
import { usePagination } from 'hooks/usePagination'
import heartIcon from 'static/iconmonstr-favorite-2.svg'
import heartFillIcon from 'static/iconmonstr-favorite-3.svg'
function Home() {
  // get query filter from localStorage
  const { value: query } = useFilterStorage()

  // get currentPage from pagination context
  const { currentPage } = usePagination()

  // get data from hn api
  const { data, loading } = useFetch(
    `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${currentPage - 1}`,
  )

  // load favorites from localStorage from custo hook
  const {
    loading: loadingFavorites,
    favorites,
    addToStorage,
    removeStorageById,
  } = useFavoritesStorage()

  // function to return the icon to be shown on card
  const isInFavoritesIcon = (parentId: number) => {
    const isInFavs = favorites?.find((o) => o.parentId === parentId)
    return isInFavs ? heartFillIcon : heartIcon
  }

  const isInFavoritesFunc = (parentId: number) => {
    const isInFavs = favorites?.find((o) => o.parentId === parentId)
    return isInFavs ? removeStorageById : addToStorage
  }

  return (
    <div>
      <DropdownMenu />
      {loading || loadingFavorites ? <p>Loading...</p> : null}
      <div className={styles.posts}>
        {data?.map((post, index) => (
          <PostCard
            key={`${index}-${post.parentId}`}
            post={post}
            handleFavorites={isInFavoritesFunc(post.parentId)}
            btnIcon={isInFavoritesIcon(post.parentId)}
          />
        ))}
      </div>
      <Pagination />
    </div>
  )
}

export default Home
