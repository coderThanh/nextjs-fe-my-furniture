import { LIMIT_MENU_ITEM_FETCH } from '@/consts/const'
import { data_menu_bottom, data_menu_mid, data_menu_mobile } from '@/data/menu'
import { isConnectAPI } from '@/helpers'
import { parseMenu } from '@/helpers/parseGQL'
import { useServerMenuList } from '@/services/hooks/hookMenus'
import { use } from 'react'

export const useSVMenuHeaderMiddle = () => {
  var menuData = []

  const { fetch } = useServerMenuList()

  const wasConnectAPI = isConnectAPI()

  const data = use(
    fetch({
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG,
      menuSize: LIMIT_MENU_ITEM_FETCH,
      isShowDataRelate: true,
      dataSize: 4,
    }),
  )

  const resData = data?.data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  if (!wasConnectAPI) {
    menuData.push(...data_menu_mid)
  } else if (wasConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}

//
export const useSVMenuHeaderMobile = () => {
  var menuData = []

  const { fetch } = useServerMenuList()

  const wasConnectAPI = isConnectAPI()

  const data = use(
    fetch({
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG,
      menuSize: LIMIT_MENU_ITEM_FETCH,
      isShowDataRelate: false,
      dataSize: 0,
    }),
  )

  const resData = data?.data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  if (!wasConnectAPI) {
    menuData.push(...data_menu_mobile)
  } else if (isConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}

//
export const useSVMenuHeaderBottom = () => {
  // menu
  var menuData = []

  const { fetch } = useServerMenuList()

  const wasConnectAPI = isConnectAPI()

  const res: any = use(
    fetch({
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG,
      menuSize: LIMIT_MENU_ITEM_FETCH,
      isShowDataRelate: false,
      dataSize: 0,
    }),
  )

  const resData = res?.data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData ?? [])

  if (!wasConnectAPI) {
    menuData.push(...data_menu_bottom)
  } else if (wasConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}
