import AppLink from '@/components-root/link'
import AppMaterialIcon, {
  AppMaterialIconType,
} from '@/components-root/material-icon'
import { formatDate, toTitleCase } from '@/helpers'

type Props = {
  createdAt?: string
  title?: string
  categories?: any[]
  styles?: any[]
  expect?: string
}

export default function BlogHeadArea({
  createdAt,
  title,
  categories,
  styles,
  expect,
}: Props) {
  return (
    <>
      <div className="article-head">
        <h1 className="article-title">{toTitleCase(title ?? '')}</h1>
        <div className="article-meta">
          <span className="article-time article-meta-item">
            <AppMaterialIcon type={AppMaterialIconType.outlined}>
              calendar_today
            </AppMaterialIcon>
            {createdAt}
          </span>
          {categories && categories?.length > 0 ? (
            <>
              <span className="article-cate article-meta-item">
                <AppMaterialIcon type={AppMaterialIconType.outlined}>
                  attach_file
                </AppMaterialIcon>
                {categories?.map((item, index) => {
                  return (
                    <AppLink
                      url={item?.slug ? item.slug : ''}
                      key={index}
                      className="link-item"
                    >
                      {index > 0 ? ', ' : ''}
                      {index == 0 ? toTitleCase(item?.title) ?? '' : ''}
                      {index > 0 ? item?.title.toLocaleLowerCase() ?? '' : ''}
                    </AppLink>
                  )
                })}
              </span>
            </>
          ) : (
            <></>
          )}
          {styles && styles?.length > 0 ? (
            <>
              <span className="article-cate article-meta-item">
                <AppMaterialIcon type={AppMaterialIconType.outlined}>
                  architecture
                </AppMaterialIcon>
                {styles?.map((item, index) => {
                  return (
                    <AppLink
                      url={item?.slug ? item.slug : ''}
                      key={index}
                      className="link-item"
                    >
                      {index > 0 ? ', ' : ''}
                      {index == 0 ? toTitleCase(item?.title) ?? '' : ''}
                      {index > 0 ? item?.title.toLocaleLowerCase() ?? '' : ''}
                    </AppLink>
                  )
                })}
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        {expect && expect?.length > 0 ? (
          <p className="article-except">{expect}</p>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
