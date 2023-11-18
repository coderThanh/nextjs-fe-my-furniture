'use client'

import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import AppAssets from '@/consts/assets'

import { register } from 'swiper/element/bundle'

type Props = {
  data?: any[]
}
export default function HomeHotBlogSlider({ data }: Props) {
  return (
    <>
      {register()}
      <swiper-container
        class="slider-light"
        slides-per-view={1}
        navigation={true}
        loop={true}
        pagination={true}
        autoplay-delay={3000}
        autoplay-pause-on-mouse-enter={true}
        space-between={10}
      >
        {...data?.map((item, index) => (
          <swiper-slide key={index}>
            <CardBlog
              thumbnail={item?.thumbnail?.url || AppAssets.placeholderGray}
              imgRatio={55}
              imgRadius={10}
              type={CardBlogType.overlay}
              title={item?.title}
              slug={item.slug}
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  )
}
