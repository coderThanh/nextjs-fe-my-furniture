import classNames from 'classnames'
import Image from 'next/image'

import { TITLE_PAGE } from '@/consts/const'
import styles from './img.module.scss'

export default function AppImage(props) {
  return (
    <div
      className={classNames(
        'imgWrap',
        props.className,
        props.ratio ? styles.ratio : '',
        styles.wrap,
      )}
      style={{
        ...props.style,
      }}
    >
      <div
        className={classNames(styles.imgInner, 'img-inner')}
        style={{
          paddingTop: props.ratio ? `${props.ratio}%` : undefined,
          borderRadius: props.radius,
        }}
      >
        <Image
          src={props.src}
          alt={props.alt || TITLE_PAGE}
          fill={props.ratio ? true : false}
          width={props.ratio ? undefined : props.width}
          height={props.ratio ? undefined : props.height}
          style={{ ...props.styleImg }}
          priority={props.priority}
          sizes={props.ratio ? props.sizes ?? '100%' : undefined}
          className={classNames(styles.img)}
        />
        <div
          className={classNames(styles.imgOverlay)}
          style={{
            backgroundColor: props.overlayCover,
          }}
        ></div>
      </div>
    </div>
  )
}
