import React from 'react'
import styles from './pagination.module.css'
import { usePagination } from 'hooks/usePagination'

const Pagination = () => {
  const { pageRange, currentPage, prevPage, nextPage, goToPage } = usePagination()

  const pageClases = `${styles.page}`
  const pageActiveClases = `${styles.page} ${styles.active}`
  return (
    <div className={styles.pagination}>
      <div className={styles.page} onClick={() => prevPage()}>
        <span>{'<'}</span>
      </div>
      {pageRange.map((page: number | string, index: number) => (
        <div
          key={index}
          className={currentPage && page == currentPage ? pageActiveClases : pageClases}
          onClick={() => goToPage(page)}
        >
          <span>{page}</span>
        </div>
      ))}
      <div className={styles.page} onClick={() => nextPage()}>
        <span>{'>'}</span>
      </div>
    </div>
  )
}
export default Pagination
