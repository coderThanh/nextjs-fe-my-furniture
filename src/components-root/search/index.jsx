import classNames from 'classnames'
import { IconSearch } from '../../components-child/icon'
import styles from './search.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isConnectAPI } from '@/helpers'
import { ROUTER_URL } from '@/consts/router'

export default function Search({ classForm, styleForm, onSubmit }) {
  const router = useRouter()
  const { query } = router

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

      router.push({
        pathname: ROUTER_URL.searchBlog,
        query: {
          keyword: stText,
        },
      })
    },
    [router, stText],
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
