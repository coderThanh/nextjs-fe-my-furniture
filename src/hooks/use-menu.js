import { data_menu_bottom, data_menu_mid, data_menu_mobile } from '@/data/menu'
import { parseMenu } from '@/helpers/menu'
import { useSWRFetch } from '@/helpers/swr'
import { docMenu } from '@/services/graphql-query'
import { useMenuList } from '@/services/hooks'

export const useMenuHeaderMiddle = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  const { data } = useSWRFetch(
    isConnectAPI ? docMenu : null,
    {
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG,
      menuSize: 100,
      isShowDataRelate: true,
      dataSize: 4,
    },
    isConnectAPI ? fetchMenu : () => {},
  )

  const resData = data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  if (!isConnectAPI) {
    menuData.push(...data_menu_mid)
  } else if (isConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}

export const useMenuHeaderMobile = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  const { data } = useSWRFetch(
    isConnectAPI ? docMenu : null,
    {
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG,
      menuSize: 100,
      isShowDataRelate: false,
      dataSize: 0,
    },
    isConnectAPI ? fetchMenu : () => {},
  )

  const resData = data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  // sort
  const menuSortByChilren = menuParsed.sort((a, b) => {
    if (a.children?.length > 0) {
      if (b.children?.length > 0) {
        if (a.order < b.order) return -1
        if (a.order > b.order) return 1

        return 0
      }

      return -1
    }

    return 0
  })

  if (!isConnectAPI) {
    menuData.push(...data_menu_mobile)
  } else if (isConnectAPI && menuSortByChilren) {
    menuData.push(...menuSortByChilren)
  }

  return { menuData }
}

export const useMenuHeaderBottom = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  const { data } = useSWRFetch(
    isConnectAPI ? docMenu : null,
    {
      slug: process.env.NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG,
      menuSize: 20,
      isShowDataRelate: false,
      dataSize: 0,
    },
    isConnectAPI ? fetchMenu : () => {},
  )

  const resData = data?.menusMenuItems?.data || []

  const menuParsed = parseMenu(resData)

  if (!isConnectAPI) {
    menuData.push(...data_menu_bottom)
  } else if (isConnectAPI && menuParsed) {
    menuData.push(...menuParsed)
  }

  return { menuData }
}
