import AppImage from '@/components-root/img'
import AppLink from '@/components-root/link'
import Search from '@/components-root/search'
import AppAssets from '@/consts/assets'
import { data_menu_mid } from '@/data/menu'
import { parseMenu } from '@/helpers/menu'
import { useSWRFetch } from '@/helpers/swr'
import AppConst from '@/models/const'
import { docMenu } from '@/services/graphql-query'
import { useMenuList } from '@/services/hooks'
import HeaderMidRight from '@/ui/header/header-mid-right'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { classHasChildren, classMenuItem, classMenuLink, classNav } from '.'
import { HeaderMidMenuDropdown } from './header-mid-menu-dropdown'
import { HeaderMidMenuDropdownFull } from './header-mid-menu-dropdown-full'
import { useMenuMiddle } from '@/hooks'
import { MenuSubLayout } from '@/consts/type'

export default function HeaderMid() {
  // Define useState
  const [isShowSearch, setShowSearch] = useState(false)

  // Method event
  function searchClick() {
    setShowSearch(!isShowSearch)
  }

  // hook
  const { menuData } = useMenuMiddle()

  console.log('menuData', menuData)

  return (
    <>
      <div
        className={classNames('container', 'header-mid desk d-none d-md-block')}
      >
        <div className={classNames('mid-inner')}>
          <AppLink classLink={classNames('logo')} url={'/'}>
            <AppImage
              src={AppAssets.imgLogoDark}
              alt={AppConst.titleDefault}
              width={200}
              height={60}
              styleImg={{ objectFit: 'contain', objectPosition: 'left' }}
              priority={true}
            />
          </AppLink>

          <div className={classNames('mid-nav_center', classNav)}>
            <motion.nav
              variants={VariantHeaderMiddle.navCenterVariants}
              animate={isShowSearch ? 'onSearchShow' : 'onSearchHidden'}
              initial={'onSearchHidden'}
              transition={{
                width: {
                  duration: 0,
                },
              }}
              className={classNames('nav-inner')}
            >
              {menuData.map((item, index) => {
                var outPut = <></>

                // choice layout ui
                if (
                  item?.subLayout == MenuSubLayout.dropdown &&
                  item?.children.length > 0
                ) {
                  outPut = <HeaderMidMenuDropdown item={item} />
                } else if (
                  item?.subLayout == MenuSubLayout.dropdownPosts &&
                  item?.children.length > 0
                ) {
                  outPut = <HeaderMidMenuDropdownFull item={item} />
                } else {
                  outPut = (
                    <AppLink
                      url={item?.url}
                      target={item?.target}
                      rel={item?.target ? '_' + item?.target : ''}
                      classLink={classNames(classMenuLink)}
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
                      item.children.length ? classHasChildren : '',
                    )}
                  >
                    {outPut}
                  </div>
                )
              })}
            </motion.nav>
            <motion.div
              variants={VariantHeaderMiddle.searchVariants}
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
      x: 100,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
      width: 0,
    },
    onShow: {
      x: 0,
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto',
      width: '80%',
    },
  }
}
