const arrayRange = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)

export const pager = (page: number, totalPages: number, maxItems = 5) => {
  if (page < maxItems) {
    const leftRange = arrayRange(1, 5)
    return [...leftRange, '...', totalPages]
  }
  if (page > totalPages - 5) {
    const rightRange = arrayRange(totalPages - 5, totalPages, 1)
    return [1, '...', ...rightRange]
  }
  const middleRange = [page - 1, page, page + 1]
  return [1, '...', ...middleRange, '...', totalPages]
}
