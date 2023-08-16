import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import AppLink from '@/components-root/link'
import Slider from '@/components-root/slider'
import AppAssets from '@/consts/assets'
import { useFetchHomeHotBanner, useFetchHomeHotBlog } from '@/hooks'
import classNames from 'classnames'
import Image from 'next/image'

export function HomeHotBlog() {
  // Hook
  const { isLoading: iLoadingBanner, data: banner } = useFetchHomeHotBanner()

  const { isLoading: isLoaddingBlogs, data: blogs } = useFetchHomeHotBlog()

  return (
    <div className="container">
      <div className={classNames('row row-equal', 'home-hot-blog')}>
        {!isLoaddingBlogs && blogs?.length > 0 ? (
          <div className="col col-sm-12 col-md-9 col-lg-9 ">
            <div className="col-inner">
              <Slider
                lg={1}
                md={1}
                sm={1}
                isShowButton={true}
                count={blogs.length}
                build={function (index) {
                  return (
                    <>
                      <CardBlog
                        thumbnail={
                          blogs[index]?.thumbnail?.url ||
                          AppAssets.placeholderGray
                        }
                        imgRatio={55}
                        imgRadius={10}
                        type={CardBlogType.overlay}
                        title={blogs[index]?.title}
                        slug={blogs[index].slug}
                      />
                    </>
                  )
                }}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {!iLoadingBanner && (
          <div className={classNames('col col-12 col-md-3 d-none d-md-block')}>
            <div
              className="col-inner"
              style={{
                position: 'relative',
              }}
            >
              <AppLink>
                <Image
                  src={banner?.url ?? AppAssets.placeholderGray}
                  fill={true}
                  sizes="100%"
                  alt={''}
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
