// Description:
// Post card component for news post

import moment from 'moment'
import styles from './postcard.module.css'
import type { IPostProps } from 'context/favoritesContext'
import clockIcon from 'static/iconmonstr-time-2.svg'

interface IPostCardProps {
  post: IPostProps
  handleFavorites: (items: IPostProps) => void
  btnIcon: string
}

function PostCard({ post, btnIcon, handleFavorites }: IPostCardProps) {
  const { storyTitle, author, storyUrl, createdAt } = post
  if (!storyTitle || !author || !storyUrl || !createdAt) return <></>
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <img src={clockIcon} alt='' />{' '}
        <span>
          {moment(createdAt).fromNow()}
          {' by '}
          {author}
        </span>
      </div>
      <div className={styles.cardContent} onClick={() => window.open(storyUrl)}>
        <div className={styles.cardTitle}>
          <p>{storyTitle}</p>
        </div>
      </div>
      <div className={styles.cardIcon} onClick={() => handleFavorites(post)}>
        <img src={btnIcon} alt='Add to favourites' />
      </div>
    </div>
  )
}
export default PostCard
