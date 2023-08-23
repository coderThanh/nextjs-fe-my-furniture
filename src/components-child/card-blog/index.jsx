import classNames from 'classnames'
import AppImage from '../../components-root/img'

import AppAssets from '@/consts/assets'
import AppLink from '../../components-root/link'
import styles from './card-blog.module.scss'

export const CardBlogType = {
  default: 'default',
  overlay: 'overlay',
  vertical: 'vertical',
}

export default function CardBlog({
  thumbnail,
  thumbnailAlt,
  type,
  className,
  isShowCate,
  cateTitle,
  styleTitle,
  imgRatio,
  imgRadius,
  title,
  isShowDate,
  isShowView,
  isShowDesc,
  cateImg,
  cateImgAlt,
  slug,
  desc,
  date,
  view,
  slugCate,
  slugStyle,
}) {
  return (
    <>
      <div
        className={classNames(
          'blog-box',
          type,
          type == CardBlogType.overlay ? styles.overlay : '',
          type == CardBlogType.vertical ? styles.vertical : '',
          styles.box,
          className,
        )}
      >
        {isShowCate && (
          <div className={classNames('blog-box-cate', styles.cateWrap)}>
            <AppImage
              src={cateImg ?? AppAssets.placeholderGray}
              ratio={100}
              alt={cateImgAlt ?? title}
              radius={100}
              className={classNames(styles.cateThumb, 'blog-box-cate-img')}
            />
            <div
              className={classNames(styles.cateInfoWrap, 'blog-box-cate-info')}
            >
              <AppLink
                url={slugCate}
                classLink={classNames(styles.cateName, 'blog-box-cate-name')}
              >
                {cateTitle}
              </AppLink>
              <AppLink
                url={slugStyle}
                classLink={classNames(styles.cateSub, 'blog-box-cate-sub')}
              >
                {styleTitle}
              </AppLink>
            </div>
          </div>
        )}

        <AppLink
          url={slug}
          classLink={classNames(styles.imgWrap, 'blog-box-img')}
        >
          <AppImage
            src={thumbnail}
            ratio={imgRatio ?? 100}
            radius={imgRadius}
            alt={thumbnailAlt ?? title}
          />
        </AppLink>
        <div
          className={classNames(styles.textWrap, 'blog-box-text')}
          style={{
            borderRadius: type == CardBlogType.overlay ? imgRadius : undefined,
          }}
        >
          <AppLink
            url={slug}
            classLink={classNames(styles.name, 'blog-box-name')}
          >
            {title}
          </AppLink>
          {(isShowDate || isShowView) && (
            <div className={classNames(styles.meta, 'blog-box-meta')}>
              {isShowView && (
                <span
                  className={classNames(
                    styles.metaItem,
                    'blog-box-meta-item view',
                  )}
                >
                  {view} lượt xem
                </span>
              )}
              {isShowDate && (
                <span
                  className={classNames(
                    styles.metaItem,
                    'blog-box-meta-item date',
                  )}
                >
                  {date}
                </span>
              )}
            </div>
          )}
          {isShowDesc && (
            <div className={classNames(styles.desc, 'blog-box-desc')}>
              {desc}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
