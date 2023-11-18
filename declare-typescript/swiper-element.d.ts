import React from 'react'

import type { SwiperSlideProps, SwiperProps } from 'swiper/react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperProps,
        HTMLElement,
        SwiperContainerAttributes
      >
      'swiper-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >
    }

    interface SwiperContainerAttributes extends KebabObjectKeys<SwiperOptions> {
      ref?: RefObject<SwiperRef>
      children?: ReactNode
      class?: string
    }
  }
}
