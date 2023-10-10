import { LIMIT_MENU_ITEM_FETCH } from '@/consts/const'
import { data_menu_bottom, data_menu_mid, data_menu_mobile } from '@/data/menu'
import { isConnectAPI } from '@/helpers'
import { parseMenu } from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import { docMenu } from '@/services/graphql-query'
import { useMenuList } from '@/services/hooks'

export const useMenuHeaderMiddle = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const wasConnectAPI = isConnectAPI()

  const { data } = useSWRFetch(
    wasConnectAPI ? docMenu : null,
    {
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG,
      menuSize: LIMIT_MENU_ITEM_FETCH,
      isShowDataRelate: true,
      dataSize: 4,
    },
    wasConnectAPI ? fetchMenu : () => {},
  )

  const resData = data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  if (!wasConnectAPI) {
    menuData.push(...data_menu_mid)
  } else if (wasConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}

export const useMenuHeaderMobile = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const wasConnectAPI = isConnectAPI()

  const { data } = useSWRFetch(
    wasConnectAPI ? docMenu : null,
    {
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG,
      menuSize: LIMIT_MENU_ITEM_FETCH,
      isShowDataRelate: false,
      dataSize: 0,
    },
    wasConnectAPI ? fetchMenu : () => {},
  )

  const resData = data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  // sort have childrent first
  // const menuSortByChilren = menuParsed.sort((a, b) => {
  //   if (a.children?.length > 0) {
  //     if (b.children?.length > 0) {
  //       if (a.order < b.order) return -1
  //       if (a.order > b.order) return 1

  //       return 0
  //     }

  //     return -1
  //   }

  //   return 0
  // })

  if (!wasConnectAPI) {
    menuData.push(...data_menu_mobile)
  } else if (isConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}

export const useMenuHeaderBottom = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const wasConnectAPI = isConnectAPI()

  const { data } = useSWRFetch(
    wasConnectAPI ? docMenu : null,
    {
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG,
      menuSize: LIMIT_MENU_ITEM_FETCH,
      isShowDataRelate: false,
      dataSize: 0,
    },
    wasConnectAPI ? fetchMenu : () => {},
  )

  const resData = data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  if (!wasConnectAPI) {
    menuData.push(...data_menu_bottom)
  } else if (wasConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}
