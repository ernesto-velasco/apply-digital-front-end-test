// Description:
// Favorites page that contains news posts stored locally on localStorage

import styles from './favorites.module.css'
import { PostCard } from 'components'
import { useFavoritesStorage } from 'hooks/useFavoritesStorage'
import heartFillIcon from 'static/iconmonstr-favorite-3.svg'

function Favorites() {
  // use custo hook to get favorites from storage
  const { loading, favorites, removeStorageById } = useFavoritesStorage()

  if (loading) return <p>Loading...</p>
  return (
    <div className={styles.posts}>
      {favorites?.length == 0 ? <p>Nothing to show yet.</p> : null}
      {favorites?.map((post, index) => (
        <PostCard
          key={`${index}-${post.parentId}`}
          post={post}
          handleFavorites={removeStorageById}
          btnIcon={heartFillIcon}
        />
      ))}
    </div>
  )
}
export default Favorites
