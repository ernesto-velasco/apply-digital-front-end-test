// Description:
// customHook to fetch and store data from HN Api on app context

import camelcaseKeys from 'camelcase-keys'
import { useEffect, useState } from 'react'
import { usePagination } from './usePagination'
import type { IPostProps } from 'context/favoritesContext'

function useFetch(path: string) {
  const [data, setData] = useState<IPostProps[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setNbPages } = usePagination()
  useEffect(() => {
    setLoading(true)
    fetch(path)
      .then((response) => {
        if (response.ok) return response.json()
        throw response
      })
      .then((data) => {
        const posts: IPostProps[] = camelcaseKeys(data.hits)
        // set data on context state
        setData(posts)
        // update total pages number from response
        setNbPages(data.nbPages)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [path, setNbPages])
  return { data, loading, error }
}
export default useFetch
