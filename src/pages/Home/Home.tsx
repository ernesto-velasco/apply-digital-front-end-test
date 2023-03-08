import styles from './home.module.css'
import { DropdownMenu, Pagination, PostCard } from 'components'
import { useFavoritesStorage } from 'hooks/useFavoritesStorage'
import useFetch from 'hooks/useFetch'
import { useFilterStorage } from 'hooks/useFilterStorage'
import { usePagination } from 'hooks/usePagination'
import heartIcon from 'static/iconmonstr-favorite-2.svg'
import heartFillIcon from 'static/iconmonstr-favorite-3.svg'
function Home() {
  const { value: query } = useFilterStorage()

  const { currentPage } = usePagination()

  const { data, loading } = useFetch(
    `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${currentPage - 1}`,
  )
  const { loading: loadingFavorites, favorites, addToStorage } = useFavoritesStorage()

  const isInFavorites = (storyId: number) => {
    const isInFavs = favorites?.find((o) => o.storyId === storyId)
    return isInFavs ? heartFillIcon : heartIcon
  }

  return (
    <div>
      <DropdownMenu />
      {loading || loadingFavorites ? <p>Loading...</p> : null}
      <div className={styles.posts}>
        {data?.map((post, index) => (
          <PostCard
            key={`${index}-${post.storyId}`}
            post={post}
            handleFavorites={addToStorage}
            btnIcon={isInFavorites(post.storyId)}
          />
        ))}
      </div>
      <Pagination />
    </div>
  )
}

export default Home
