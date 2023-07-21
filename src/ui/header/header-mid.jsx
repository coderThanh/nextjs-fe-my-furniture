import AppButton, {
  AppButtonColor,
  AppButtonKind,
} from '../../components-root/button'

import AppAssets from '@/models/assets'
import AppConst from '@/models/const'
import { parseToMenuItemTypeDocs } from '@/models/menus/controller'
import SWRKey from '@/models/swr-key'
import { getMenuAndchildrent } from '@/services/hooks/hookMenus'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useSWR from 'swr'
import {
  classHasChildren,
  classMenuIcon,
  classMenuItem,
  classMenuLink,
  classMenuSub,
  classNav,
} from '.'
import {
  IconAccount,
  IconCart,
  IconEsc,
  IconHearth,
  IconSearch,
} from '../../components-child/icon'
import HeaderMenuDropDown from '../../components-root/header-menu-dropdown'
import AppImage from '../../components-root/img'
import AppLink from '../../components-root/link'
import ListTitle from '../../components-root/list-title'
import AppMaterialIcon, {
  AppMaterialIconType,
} from '../../components-root/material-icon'
import Search from '../../components-root/search'
import { HeaderMidMenuDropdown } from './header-mid-menu-dropdown'
import { HeaderMidMenuDropdownFull } from './header-mid-menu-dropdown-full'

const dataDemo = [
  {
    children: {
      data: [
        {
          children: { data: [] },
          docType: undefined,
          docs: [],
          subLayout: 'dropdown',
          title: 'About',
          url: '',
        },
        {
          children: { data: [] },
          docType: undefined,
          docs: [],
          subLayout: 'dropdown',
          title: 'Contact',
          url: '',
        },
        {
          children: { data: [] },
          docType: undefined,
          docs: [],
          subLayout: 'dropdown',
          title: 'About me',
          url: '',
        },
      ],
    },
    docType: undefined,
    docs: [],
    subLayout: 'dropdown',
    title: 'Dropdown',
    url: '',
  },
  {
    title: 'Dropdown full',
    children: {
      data: [
        {
          docType: 'blog',
          docs: [1, 3, 4, 4],
          subLayout: 'dropdown',
          title: 'Chuyện nhà',
          url: '',
          children: { data: [] },
        },
        {
          docType: 'blog',
          docs: [1, 3, 4],
          subLayout: 'dropdown',
          title: 'Kho ảnh',
          url: '',
          children: { data: [] },
        },
        {
          docType: 'blog',
          docs: [1, 3, 4, 4],
          subLayout: 'dropdown',
          title: 'Trang chủ',
          url: '',
          children: { data: [] },
        },
        {
          docType: 'blog',
          docs: [1, 3, 4],
          subLayout: 'dropdown',
          title: 'Indochine',
          url: '',
          children: { data: [] },
        },
        {
          docType: 'blog',
          docs: [1, 2, 3, 4],
          subLayout: 'dropdown',
          title: 'Minimalism',
          url: '',
          children: { data: [] },
        },
        {
          docType: 'blog',
          docs: [],
          subLayout: 'dropdown',
          title: 'Emagazine',
          url: '',
          children: { data: [] },
        },
      ],
    },
    docType: undefined,
    docs: [],
    subLayout: 'dropdown-full',
    url: '',
  },
  { title: 'Chuyên gia', url: '', target: '' },
]

export default function HeaderMid() {
  // Define useState
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isShowSearch, setShowSearch] = useState(false)

  // menu
  var menuData = []

  // const { data } = useSWR(
  //   SWRKey.headerMiddle,
  //   () =>
  //     getMenuAndchildrent(
  //       process.env.NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG,
  //       true,
  //     ),
  //   {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: true,
  //   },
  // )

  const data = {}

  if (!process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) {
    menuData.push(...dataDemo)
  } else if (data) {
    data.forEach((item) => {
      menuData.push(parseToMenuItemTypeDocs(item))
    })
  }

  // Method event
  function searchClick() {
    setShowSearch(!isShowSearch)
  }

  return (
    <>
      <div
        className={classNames(
          'container-lg',
          'header-mid desk d-none d-md-block',
        )}
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

                if (
                  item.subLayout == 'dropdown' &&
                  item.children &&
                  item.children.data.length > 0
                ) {
                  outPut = <HeaderMidMenuDropdown item={item} />
                } else if (
                  item.subLayout == 'dropdown' &&
                  item.children &&
                  item.children.data.length > 0
                ) {
                  outPut = <HeaderMidMenuDropdownFull item={item} />
                } else {
                  outPut = (
                    <AppLink
                      url={item.url}
                      target={item.target}
                      rel={item.target ? '_' + item.target : ''}
                      classLink={classNames(classMenuLink)}
                    >
                      {item.title}
                    </AppLink>
                  )
                }

                return (
                  <div
                    key={index}
                    className={classNames(
                      classMenuItem,
                      item.children?.data?.length ? classHasChildren : '',
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

          <div className={classNames('mid-nav_right')}>
            <div className={classNames(classMenuItem)}>
              <AppButton
                kind={AppButtonKind.default}
                color={
                  isShowSearch ? AppButtonColor.dark : AppButtonColor.white
                }
                className={classNames('btn-icon')}
                onClick={searchClick}
              >
                <>
                  {!isShowSearch && (
                    <IconSearch className={classNames('icon')} />
                  )}
                  {isShowSearch && <IconEsc className={classNames('icon')} />}
                </>
              </AppButton>
            </div>
            <div className={classNames(classMenuItem)}>
              <HeaderMenuDropDown
                title={
                  <AppButton
                    kind={AppButtonKind.default}
                    color={AppButtonColor.white}
                  >
                    <IconAccount className={classNames('icon')} />
                  </AppButton>
                }
                isOpen={isAccountOpen}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                classChildren={classNames(classMenuSub)}
                isShowHover={true}
              >
                <ListTitle
                  classNameText={'list-title'}
                  text={'Đăng nhập'}
                  iconMaterial={
                    <AppMaterialIcon type={AppMaterialIconType.outlined}>
                      play_circle
                    </AppMaterialIcon>
                  }
                ></ListTitle>
                <ListTitle
                  text={'Đăng xuất'}
                  classNameText={'list-title'}
                  iconMaterial={
                    <AppMaterialIcon type={AppMaterialIconType.outlined}>
                      open_in_new
                    </AppMaterialIcon>
                  }
                ></ListTitle>
                <ListTitle
                  classNameText={'list-title'}
                  text={'Thông tin'}
                  iconMaterial={
                    <AppMaterialIcon type={AppMaterialIconType.outlined}>
                      settings
                    </AppMaterialIcon>
                  }
                ></ListTitle>
                <ListTitle
                  classNameText={'list-title'}
                  text={'Đơn hàng'}
                ></ListTitle>
              </HeaderMenuDropDown>
            </div>
            <div className={classNames(classMenuItem)}>
              <AppButton
                kind={AppButtonKind.default}
                color={AppButtonColor.white}
                className={classNames(classMenuIcon)}
              >
                <>
                  <IconHearth className={classNames('icon')} />
                  <span className={classNames('number')}>3</span>
                </>
              </AppButton>
            </div>
            <div className={classNames(classMenuItem)}>
              <AppButton
                kind={AppButtonKind.default}
                color={AppButtonColor.white}
                className={classNames(classMenuIcon)}
              >
                <>
                  <IconCart className={classNames('icon')} />
                  <span className={classNames('number')}>30</span>
                </>
              </AppButton>
            </div>
          </div>
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
