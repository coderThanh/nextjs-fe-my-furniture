import HeaderMenuDropDown from '@/components-root/header-menu-dropdown'
import AppLink from '@/components-root/link'
import { isConnectAPI } from '@/helpers'
import { parseBlogEnity } from '@/helpers/parseGQL'
import classNames from 'classnames'
import { useState } from 'react'
import {
  classChildrenLink,
  classFull,
  classMenuLink,
  classMenuSub,
  classMenuSubFull,
} from '.'
import CardBlog from '../../components-child/card-blog'

export function HeaderMidMenuDropdownFull(props) {
  const [stateIndexDocsShow, setIndexDocShow] = useState()

  function onHoverSubItem(docIndex) {
    if (docIndex != undefined) {
      setIndexDocShow(docIndex)
    }
  }

  return (
    <>
      <HeaderMenuDropDown
        title={
          <AppLink
            url={props.item.url}
            classLink={classNames(classMenuLink, 'parent')}
          >
            {props.item.title}
          </AppLink>
        }
        classChildren={classNames(classMenuSub, classMenuSubFull)}
        isShowHover={true}
        isSubFullWidth={true}
        isOpen={false}
      >
        <>
          <div className={classNames('container')}>
            <div className={classNames('row')}>
              <div className="col col-12 col-md-2">
                <div className={classNames('sub-nav')}>
                  <div className={classNames('sub-title')}>
                    {props.item.title}
                  </div>
                  {props.item.children?.map((item, index) => (
                    <div
                      key={index}
                      className="sub-menu-item"
                      onMouseEnter={
                        (event) => onHoverSubItem(index)
                        // onHoverSubItem(item.docs?.length ? index : undefined)
                      }
                    >
                      <AppLink
                        url={item.url}
                        classLink={classNames(
                          classChildrenLink,
                          classFull,
                          classMenuLink,
                        )}
                      >
                        {item.title}
                      </AppLink>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col col-md-10">
                <div className={classNames('sub-showcase')}>
                  {props.item.children?.map((item, index) => {
                    const docsShow = item.docs?.map((itemDoc, indexChild) => {
                      // Demo if product not connect API
                      if (!isConnectAPI()) {
                        return (
                          <CardBlog
                            key={indexChild}
                            isShowCate={true}
                            imgRadius={7}
                            thumbnail={`/images/products/prd_${Math.min(
                              indexChild + 1,
                              7,
                            )}.jpg`}
                            title={
                              'Nhà ống hẹp 3.35m sửa một chút và thêm tầng, không gian đã thay đổi hoàn toàn'
                            }
                            cateTitle={'Category name'}
                            styleTitle={'Style name'}
                          />
                        )
                      }

                      const itemBlog = parseBlogEnity(itemDoc)

                      return (
                        <CardBlog
                          slug={itemBlog?.slug}
                          slugCate={
                            itemBlog?.categories &&
                            itemBlog?.categories?.length > 0
                              ? itemBlog?.categories[0]?.slug
                              : ''
                          }
                          slugStyle={
                            itemBlog?.styles && itemBlog?.styles?.length > 0
                              ? itemBlog?.styles[0]?.slug
                              : ''
                          }
                          key={indexChild}
                          isShowCate={true}
                          imgRadius={7}
                          imgRatio={60}
                          thumbnail={itemBlog?.thumbnail?.url}
                          title={itemBlog?.title}
                          cateTitle={
                            itemBlog?.categories &&
                            itemBlog?.categories?.length > 0
                              ? itemBlog?.categories[0]?.title
                              : ''
                          }
                          cateImgAlt={
                            itemBlog?.categories &&
                            itemBlog?.categories?.length > 0
                              ? itemBlog?.categories[0]?.title
                              : ''
                          }
                          cateImg={
                            itemBlog?.categories &&
                            itemBlog?.categories?.length > 0
                              ? itemBlog?.categories[0]?.thumbnail?.url
                              : ''
                          }
                          styleTitle={
                            itemBlog?.styles && itemBlog?.styles?.length > 0
                              ? itemBlog?.styles[0]?.title
                              : ''
                          }
                        />
                      )
                    })

                    if (
                      (item.docs && item?.docs.length <= 0) ||
                      item.docs == undefined
                    )
                      return

                    if (stateIndexDocsShow == undefined) setIndexDocShow(index)

                    return (
                      <div
                        key={index}
                        className={classNames(
                          'sub-showcase-item',
                          stateIndexDocsShow == index ? 'active' : '',
                        )}
                        data-parent={index}
                      >
                        {docsShow}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      </HeaderMenuDropDown>
    </>
  )
}
