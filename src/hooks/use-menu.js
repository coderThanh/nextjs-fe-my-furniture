import { data_menu_mid } from '@/data/menu'
import { parseMenu } from '@/helpers/menu'
import { useSWRFetch } from '@/helpers/swr'
import { docMenu } from '@/services/graphql-query'
import { useMenuList } from '@/services/hooks'

export const useMenuMiddle = () => {
  // menu
  var menuData = []

  const { fetchMenu } = useMenuList()

  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  const { data } = useSWRFetch(
    `${docMenu}${isConnectAPI ? '' : 'noapi'}`,
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
