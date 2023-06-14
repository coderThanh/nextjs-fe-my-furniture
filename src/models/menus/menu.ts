import { MenuItemResType } from "./menu-item";

export type MenuEntity = {
  id: string;
  attributes: {
    title: string;
    slug: string;
    items: { data: MenuItemResType[] };
    createdAt: string;
    updatedAt: string;
  };
};

export type fetcherMenus = {
  menusMenus?: { data: MenuEntity[] };
};
