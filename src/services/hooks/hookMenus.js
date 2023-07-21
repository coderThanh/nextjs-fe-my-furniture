import GraphQLQuery from '@/models/graphql/graphql-query'
import { fetcherGraphSQL } from '@/services/hooks/hookServerAPI'

export async function getMenuAndchildrent(slugMenu, isShowDataRelate = false) {
  const dataRes = await fetcherGraphSQL(GraphQLQuery.getMenuHeaderParent, {
    slug: slugMenu,
  })

  const menuParent = []

  if (dataRes?.menusMenus?.data[0].attributes.items.data) {
    menuParent.push(...dataRes.menusMenus.data[0].attributes.items.data)
  }

  const menuParentWithChildPromise = menuParent.map(async (item, index) => {
    const itemDataResItems = await fetcherGraphSQL(
      GraphQLQuery.getMenuItemsByIdParent,
      {
        id: item.id,
        isShowDataRelate: isShowDataRelate,
      },
    )

    if (itemDataRes.menusMenuItems?.data) {
      item.attributes.children = {
        data: itemDataRes.menusMenuItems.data,
      }
    }

    return item
  })

  const result = await Promise.all(menuParentWithChildPromise)

  return result
}
