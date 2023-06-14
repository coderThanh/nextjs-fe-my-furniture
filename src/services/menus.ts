import GraphQLQuery from "@/models/graphql/graphql-query";
import { fetcherMenus } from "@/models/menus/menu";
import { MenuItemResType, fetcherMenusItems } from "@/models/menus/menu-item";
import { fetcherGraphSQL } from "./fetcher";

export async function getMenuAndchildrent(
  slugMenu: string,
  isShowDataRelate: boolean = false
) {
  const dataRes: fetcherMenus = await fetcherGraphSQL(
    GraphQLQuery.getMenuHeaderParent,
    {
      slug: slugMenu,
    }
  );

  const menuParent: MenuItemResType[] = [];

  if (dataRes.menusMenus?.data[0].attributes.items.data) {
    menuParent.push(...dataRes.menusMenus.data[0].attributes.items.data);
  }

  for (let index = 0; index < menuParent.length; index++) {
    const itemDataRes: fetcherMenusItems = await fetcherGraphSQL(
      GraphQLQuery.getMenuItemsByIdParent,
      {
        id: menuParent[index].id,
        isShowDataRelate: isShowDataRelate,
      }
    );

    if (itemDataRes.menusMenuItems?.data) {
      menuParent[index].attributes.children = {
        data: itemDataRes.menusMenuItems.data,
      };
    }
  }

  return menuParent;
}
