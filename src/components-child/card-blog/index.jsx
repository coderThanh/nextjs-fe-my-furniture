import classNames from 'classnames'
import AppImage from '../../components-root/img'

import styles from './card-blog.module.scss'
import AppLink from '../../components-root/link'
import AppAssets from '@/consts/assets'

export const CardBlogType = {
  default: 'default',
  overlay: 'overlay',
  vertical: 'vertical',
}

export default function CardBlog(props) {
  var imgSrc = AppAssets.placeholderGray

  if (props.thumbnail) imgSrc = props.thumbnail

  return (
    <>
      <div
        className={classNames(
          'blog-box',
          props.type,
          props.type == CardBlogType.overlay ? styles.overlay : '',
          props.type == CardBlogType.vertical ? styles.vertical : '',
          styles.box,
          props.className,
        )}
      >
        {props.isShowCate && (
          <div className={classNames('blog-box-cate', styles.cateWrap)}>
            <AppImage
              src={imgSrc}
              ratio={100}
              alt={''}
              radius={100}
              className={classNames(styles.cateThumb, 'blog-box-cate-img')}
            />
            <div
              className={classNames(styles.cateInfoWrap, 'blog-box-cate-info')}
            >
              <div
                className={classNames(styles.cateName, 'blog-box-cate-name')}
              >
                {props.cateTitle}
              </div>
              <div className={classNames(styles.cateSub, 'blog-box-cate-sub')}>
                {props.styleTitle}
              </div>
            </div>
          </div>
        )}

        <AppLink
          url={'/single-post'}
          classLink={classNames(styles.imgWrap, 'blog-box-img')}
        >
          <AppImage
            src={imgSrc}
            ratio={props.imgRatio || 100}
            radius={props.imgRadius}
            alt={''}
          />
        </AppLink>
        <div
          className={classNames(styles.textWrap, 'blog-box-text')}
          style={{
            borderRadius:
              props.type == CardBlogType.overlay ? props.imgRadius : undefined,
          }}
        >
          <AppLink
            url={'/single-post'}
            classLink={classNames(styles.name, 'blog-box-name')}
          >
            {props.title}
          </AppLink>
          {(props.isShowDate || props.isShowView) && (
            <div className={classNames(styles.meta, 'blog-box-meta')}>
              {props.isShowView && (
                <span
                  className={classNames(
                    styles.metaItem,
                    'blog-box-meta-item view',
                  )}
                >
                  148 lượt xem
                </span>
              )}
              {props.isShowDate && (
                <span
                  className={classNames(
                    styles.metaItem,
                    'blog-box-meta-item date',
                  )}
                >
                  20/05/2023
                </span>
              )}
            </div>
          )}
          {props.isShowDesc && (
            <div className={classNames(styles.desc, 'blog-box-desc')}>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
              amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo. Quisque sit amet est et sapien ullamcorper
              pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae,
            </div>
          )}
        </div>
      </div>
    </>
  )
}
