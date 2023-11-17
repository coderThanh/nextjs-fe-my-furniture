'use client'

import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import AppLink from '@/components-root/link'
import { ROUTER_URL } from '@/consts/router'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect } from 'react'

import { register } from 'swiper/element/bundle'

export function HomeHotBlogDemo() {
  useEffect(() => {
    register()
  }, [])
  return (
    <>
      <div className="container">
        <div className={classNames('row row-equal', 'home-hot-blog')}>
          {
            <div className="col col-sm-12 col-md-9 col-lg-9 ">
              <div className="col-inner">
                <swiper-container
                  slides-per-view={1}
                  className="slider-light"
                  loop={true}
                  navigation={true}
                  pagination={true}
                  autoplay-delay={3000}
                  autoplay-pause-on-mouse-enter={true}
                >
                  {...[1, 2, 3, 4].map((item, index) => (
                    <swiper-slide key={index}>
                      <CardBlog
                        thumbnail={`/images/blogs/blog_${Math.min(
                          index + 1,
                          6,
                        )}.jpg`}
                        imgRatio={55}
                        imgRadius={10}
                        type={CardBlogType.overlay}
                        title={
                          'Giảm vật liệu công nghiệp, tăng chất liệu tự nhiên - cách KTS thay đổi không gian sống cho gia chủ'
                        }
                        slug={ROUTER_URL.blogDetailDemo}
                      />
                    </swiper-slide>
                  ))}
                </swiper-container>
              </div>
            </div>
          }
          {
            <div
              className={classNames('col col-12 col-md-3 d-none d-md-block')}
            >
              <div
                className="col-inner"
                style={{
                  position: 'relative',
                }}
              >
                <AppLink>
                  <Image
                    src={'/images/banner/banner_1.jpg'}
                    fill={true}
                    sizes="100%"
                    alt={''}
                    priority={true}
                    style={{ borderRadius: 10, objectFit: 'cover' }}
                  />
                </AppLink>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}
