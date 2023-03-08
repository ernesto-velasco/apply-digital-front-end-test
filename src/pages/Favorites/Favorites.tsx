import styles from './favorites.module.css'
import { PostCard } from 'components'
import { useFavoritesStorage } from 'hooks/useFavoritesStorage'
import heartFillIcon from 'static/iconmonstr-favorite-3.svg'

function Favorites() {
  const { loading, favorites, removeStorageById } = useFavoritesStorage()

  if (loading) return <p>Loading...</p>
  return (
    <div className={styles.posts}>
      {favorites?.map((post, index) => (
        <PostCard
          key={`${index}-${post.storyId}`}
          post={post}
          handleFavorites={removeStorageById}
          btnIcon={heartFillIcon}
        />
      ))}
    </div>
  )
}
export default Favorites
