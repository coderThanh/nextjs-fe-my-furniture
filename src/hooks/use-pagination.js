import { removeObjectKeyEmpty } from '@/helpers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const usePagination = (currPageInit, pageStarInit, countInit) => {
  const [currPage, setCurrPage] = useState(currPageInit)
  const [pageStart, setPageStart] = useState(pageStarInit)
  const [countOfPage, setCountOfPage] = useState(countInit)

  const paginatedData = (totalItems, startPage, pageCount) => {
    setPageStart(startPage)
  }

  return {
    currPage,
    setCurrPage,
    pageStart,
    setPageStart,
    countOfPage,
    setCountOfPage,
    paginatedData,
  }
}

export const usePaginationFething = (pageCountInit) => {
  const router = useRouter()
  const { query } = router
  var pageStartInit = 1

  pageStartInit = Math.ceil(parseInt(query.skip) / pageCountInit) + 1

  const { currPage, setCurrPage, pageStart, countOfPage, setPageStart } =
    usePagination(pageStartInit, 1, pageCountInit)

  //  handle change page
  const paginatedData = (totalItems, startIndex, pageCount) => {
    setPageStart(startIndex)

    if (startIndex == pageStart) return

    if (startIndex < pageCount) {
      query.skip = ''
    } else {
      query.skip = startIndex
    }

    router.push({
      pathname: router.pathname,
      query: removeObjectKeyEmpty(query),
    })

    setPageStart(startIndex)
  }

  useEffect(() => {
    if (query?.skip) {
      setCurrPage(Math.ceil(parseInt(query.skip) / pageCountInit) + 1)
    } else {
      setCurrPage(1)
    }
  }, [pageCountInit, query, setCurrPage])

  return { paginatedData, currPage, setCurrPage, pageStart, countOfPage }
}
