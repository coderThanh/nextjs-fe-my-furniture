import { LIMIT_FETCH } from '@/consts/const'
import { parseQueryOptions, serializerQueryOptions } from '@/helpers/method'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

//
export const usePagination = (
  currPageInit: number,
  pageStarInit: number,
  countInit: number,
  ref?: any,
) => {
  const [currPage, setCurrPage] = useState(currPageInit)
  const [pageStart, setPageStart] = useState(pageStarInit)
  const [countOfPage, setCountOfPage] = useState(countInit)

  const paginatedData = (pageNext: number) => {
    if (pageNext == currPage) return

    if (ref?.current?.offsetTop && window != undefined) {
      window.scrollTo({
        top: ref?.current?.offsetTop - 150,
        left: 0,
        behavior: 'smooth',
      })
    }

    setPageStart((pageNext - 1) * countOfPage)
    setCurrPage(pageNext)
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

//
export const usePaginationFething = (pageCountInit: number) => {
  const router = useRouter()
  const pathName = usePathname()
  var searchParams = useSearchParams()

  const options = parseQueryOptions(searchParams)
  const optionsString = serializerQueryOptions(options)

  var pageStartInit = 1

  var skip = searchParams.get('skip') ?? '0'

  pageStartInit = Math.ceil(parseInt(skip) / pageCountInit) + 1

  const { currPage, setCurrPage, pageStart, countOfPage, setPageStart } =
    usePagination(pageStartInit, 1, pageCountInit)

  //  handle change page
  const paginatedData = (totalItems, startIndex, pageCount) => {
    setPageStart(startIndex)

    if (startIndex == pageStart) return

    if (startIndex < pageCount) {
      skip = ''
    } else {
      skip = startIndex
    }

    router.push(`${pathName}${optionsString ? '?' + optionsString : ''}` as any)

    setPageStart(startIndex)
  }

  useEffect(() => {
    if (skip) {
      setCurrPage(Math.ceil(parseInt(skip) / pageCountInit) + 1)
    } else {
      setCurrPage(1)
    }
  }, [pageCountInit, searchParams, setCurrPage, skip])

  return { paginatedData, currPage, setCurrPage, pageStart, countOfPage }
}

//
export const usePaginationFethingSSR = (pageCountInit = LIMIT_FETCH) => {
  const searchParams = useSearchParams()

  var pageStartInit = 1

  if (searchParams.get('skip')) {
    pageStartInit =
      Math.ceil(parseInt(searchParams.get('skip')!) / pageCountInit) + 1
  }

  const [currPage, setCurrPage] = useState(pageStartInit)
  const [countOfPage, setCountOfPage] = useState(pageCountInit)

  useEffect(() => {
    if (searchParams.get('skip')) {
      var pageStartInit =
        Math.ceil(parseInt(searchParams.get('skip')!) / pageCountInit) + 1

      setCurrPage(pageStartInit)
    } else {
      setCurrPage(1)
    }
  }, [pageCountInit, searchParams])

  return { currPage, setCurrPage, countOfPage, setCountOfPage }
}
