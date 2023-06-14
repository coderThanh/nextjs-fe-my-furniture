import { UploadFileEntry } from "../upload-file";

export enum MenuItemTypeLink {
  link = "link",
  category = "attr_category",
  style = "attr_style",
  blog = "attr_blog",
}

export enum MenuItemSubLayout {
  dropdown = "dropdown",
  dropdownFullWithPostRight = "dropdownPosts",
}

export enum DocType {
  blog = "blog",
  category = "category",
  style = "style",
  tag = "tag",
}

//
export interface MenuItemType {
  title: string;
  url?: string;
  target?: string;
  rel?: string;
  children?: { data: Array<MenuItemType> };
  subLayout?: MenuItemSubLayout;
}

export interface MenuItemTypeDocs extends MenuItemType {
  docs?: Array<any>;
  docType?: DocType;
  children?: { data: Array<MenuItemTypeDocs> };
}

export type fetcherMenusItems = {
  menusMenuItems?: { data: MenuItemResType[] };
};

export type MenuItemResType = {
  id: number;
  attributes: {
    title: string;
    order: number;
    url?: string;
    target?: string;
    attr_type_link?: string;
    attr_rel?: string;
    attr_layout_sub?: MenuItemSubLayout;
    attr_category?: MenuItemResAttrType<MenuItemBlogs>;
    attr_style?: MenuItemResAttrType<MenuItemBlogs>;
    attr_blog?: MenuItemResAttrType<MenuItemBlogs>;
    children?: { data: Array<MenuItemResType> };
  };
};

export type MenuItemResAttrType<T> = {
  data: {
    id: number;
    attributes: {
      title: string;
      slug: string;
      blogs?: {
        data: Array<T>;
      };
    };
  } | null;
};

export type MenuItemBlogs = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    thumbnail?: {
      id: number;
      attributes: UploadFileEntry;
    };
  };
};
