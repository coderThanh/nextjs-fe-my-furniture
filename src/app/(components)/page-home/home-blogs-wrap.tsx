import HomeBlogsShow from '@/app/(components)/page-home/home-blogs'
import Gap from '@/components-root/gap'
import { UseFetchServerHomeBlogs } from '@/hooks/use-home'
import classNames from 'classnames'

export default function HomeBlogs({}) {
  const data = UseFetchServerHomeBlogs()

  const { items } = data ?? {}

  return (
    <>
      <section className="home-posts">
        <Gap large={50} small={30} />
        <div className="container">
          {items && items?.length > 0 ? (
            <div className="row ">
              <div className="col">
                <div className="col-inner">
                  <div className={classNames('title_default')}>
                    <h3>Mới nhất</h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <HomeBlogsShow data={items ?? []} />
        </div>
      </section>
    </>
  )
}
