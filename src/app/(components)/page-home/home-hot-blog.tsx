import HomeHotBlogSlider from '@/app/(components)/page-home/home-hot-blog-slider'
import AppLink from '@/components-root/link'
import AppAssets from '@/consts/assets'
import {
  UseGetServerHomeHotBanner,
  UseGetServerHomeHotBlog,
} from '@/hooks/use-home'
import classNames from 'classnames'
import Image from 'next/image'

export function HomeHotBlog() {
  // Hook

  const data = UseGetServerHomeHotBlog()

  const dataBanner = UseGetServerHomeHotBanner()

  return (
    <div className="container">
      <div className={classNames('row row-equal', 'home-hot-blog')}>
        {data?.length > 0 ? (
          <div className="col col-sm-12 col-md-9 col-lg-9 ">
            <div className="col-inner">
              <HomeHotBlogSlider data={data ?? []} />
            </div>
          </div>
        ) : (
          ''
        )}
        {dataBanner && (
          <div className={classNames('col col-12 col-md-3 d-none d-md-block')}>
            <div
              className="col-inner"
              style={{
                position: 'relative',
              }}
            >
              <AppLink
                url={dataBanner?.url}
                title={dataBanner?.title}
                rel={dataBanner?.rel}
                target={dataBanner?.target}
              >
                <Image
                  src={dataBanner?.img?.url ?? AppAssets.placeholderGray}
                  fill={true}
                  sizes="100%"
                  alt={dataBanner?.img?.alt}
                  priority={true}
                  style={{ borderRadius: 10, objectFit: 'cover' }}
                />
              </AppLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
