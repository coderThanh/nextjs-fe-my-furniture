import classNames from 'classnames'
import { IconSearch } from '../../components-child/icon'
import styles from './search.module.scss'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { getQueryStringParameter, isConnectAPI } from '@/helpers'
import { ROUTER_URL } from '@/consts/router'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parseQueryOptions, serializerQueryOptions } from '@/helpers/method'

type Props = {
  classForm?: string
  styleForm?: CSSProperties
  onSubmit?: Function
}
export default function Search({ classForm, styleForm, onSubmit }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const query = parseQueryOptions(searchParams)

  const [stText, setText] = useState('')

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      const isConnect = isConnectAPI()

      onSubmit && onSubmit()

      if (!isConnect) {
        router.push(ROUTER_URL.searchBlogDemo)
        return
      }

      query.keyword = stText

      const paramsString = serializerQueryOptions(query)

      router.push(`${pathName}${paramsString ? '?' + paramsString : ''}`)
    },
    [onSubmit, pathName, query, router, stText],
  )

  useEffect(() => {
    if (query?.keyword) {
      setText(query.keyword)
    }
  }, [query])

  return (
    <>
      <form className={classForm} style={styleForm} onSubmit={handleSubmit}>
        <div className={classNames(styles.inputWrap, 'search-wrap')}>
          <button
            type="submit"
            className={classNames(styles.submit, 'search-submit')}
          >
            <IconSearch />
          </button>
          <input
            type="text"
            value={stText}
            className={classNames(styles.inputText, 'search-input')}
            placeholder="Tìm kiếm.."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </form>
    </>
  )
}
