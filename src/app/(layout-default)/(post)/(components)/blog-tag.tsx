import AppLink from '@/components-root/link'
import { ROUTER_URL } from '@/consts/router'

type Props = {
  data: any[]
}

export default function BlogTagArea({ data }: Props) {
  return (
    <>
      <div className="single-tag single-section">
        <div className="single-tag-title">
          <span className="me-2 d-inline-block mb-3">Tags:</span>

          <div className="tags-wrap">
            {data?.map((item, index) => {
              return (
                <AppLink
                  url={
                    item?.slug
                      ? `${ROUTER_URL.blogs}?tagSlug=${item.slug}`
                      : ('' as any)
                  }
                  key={index}
                  className="tag-item"
                >
                  {item?.title ?? ''}
                </AppLink>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
