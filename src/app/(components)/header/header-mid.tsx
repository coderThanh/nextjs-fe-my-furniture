'use client'

import HeaderMidRight from '@/app/(components)/header/header-mid-right'
import AppImage from '@/components-root/img'
import AppLink from '@/components-root/link'
import Search from '@/components-root/search'
import AppAssets from '@/consts/assets'
import { TITLE_PAGE } from '@/consts/const'
import { MenuSubLayoutType } from '@/consts/type'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { classHasChildren, classMenuItem, classMenuLink, classNav } from '.'
import { HeaderMidMenuDropdown } from './header-mid-menu-dropdown'
import { HeaderMidMenuDropdownFull } from './header-mid-menu-dropdown-full'

type Props = {
  data: any[]
}

export default function HeaderMid({ data }: Props) {
  // Define useState
  const [isShowSearch, setShowSearch] = useState(false)

  // Method event
  function searchClick() {
    setShowSearch(!isShowSearch)
  }

  return (
    <>
      <div
        className={classNames('container', 'header-mid desk d-none d-lg-block')}
      >
        <div className={classNames('mid-inner')}>
          <AppLink className={classNames('logo')} url={'/'}>
            <AppImage
              src={AppAssets.imgLogoDark}
              alt={TITLE_PAGE}
              width={200}
              height={30}
              styleImg={{ objectFit: 'contain', objectPosition: 'left' }}
              priority={true}
            />
          </AppLink>

          <div className={classNames('mid-nav_center', classNav)}>
            <motion.div
              variants={VariantHeaderMiddle.navCenterVariants as any}
              animate={isShowSearch ? 'onSearchShow' : 'onSearchHidden'}
              initial={'onSearchHidden'}
              transition={{
                width: {
                  duration: 0,
                },
              }}
              className={classNames('nav-inner')}
            >
              {data?.map((item, index) => {
                var outPut = <></>

                // choice layout ui
                if (
                  item?.subLayout == MenuSubLayoutType.dropdown &&
                  item?.children.length > 0
                ) {
                  outPut = <HeaderMidMenuDropdown item={item} />
                } else if (
                  item?.subLayout == MenuSubLayoutType.dropdownPosts &&
                  item?.children.length > 0
                ) {
                  outPut = <HeaderMidMenuDropdownFull item={item} />
                } else {
                  outPut = (
                    <AppLink
                      url={item?.url}
                      target={item?.target}
                      rel={item?.target ? '_' + item?.target : ''}
                      className={classNames(classMenuLink)}
                    >
                      {item?.title}
                    </AppLink>
                  )
                }

                return (
                  <div
                    key={index}
                    className={classNames(
                      classMenuItem,
                      item?.children?.length ? classHasChildren : '',
                    )}
                  >
                    {outPut}
                  </div>
                )
              })}
            </motion.div>
            <motion.div
              variants={VariantHeaderMiddle.searchVariants as any}
              animate={isShowSearch ? 'onShow' : 'onHidden'}
              initial="onHidden"
              transition={{
                width: {
                  duration: 0,
                },
              }}
              className={classNames('search-form')}
            >
              <Search />
            </motion.div>
          </div>
          {/* Header middle Right */}
          <HeaderMidRight
            isShowSearch={isShowSearch}
            handleSearchClick={searchClick}
          />
        </div>
      </div>
    </>
  )
}

//
class VariantHeaderMiddle {
  static navCenterVariants = {
    onSearchShow: {
      x: -100,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
      width: 0,
      flexWrap: 'nowrap',
      overflow: 'hidden',
      display: 'none',
    },
    onSearchHidden: {},
  }

  static searchVariants = {
    onHidden: {
      x: 30,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
      width: 0,
      display: 'none',
    },
    onShow: {
      x: 0,
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto',
      width: '80%',
      display: 'block',
    },
  }
}
