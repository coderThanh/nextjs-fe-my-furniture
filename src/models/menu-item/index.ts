export type MenuItemType = {
  title: string;
  url?: string;
  target?: string;
  rel?: string;
};

export enum AttrTypeLink {
  link = "link",
  category = "attr_category",
  style = "attr_style",
  blog = "attr_blog",
}

export type MenuItemResType = {
  id: number;
  attributes: {
    title: string;
    target?: string;
    order: number;
    attr_type_link?: string;
    attr_rel?: string;
    url?: string;
    attr_category?: MenuItemResAttrType;
    attr_style?: MenuItemResAttrType;
    attr_blog?: MenuItemResAttrType;
  };
};

export type MenuItemResAttrType = {
  data: { id: number; attributes: { title: string } } | null;
};

export function parseToMenuItem(args: MenuItemResType): MenuItemType {
  var outUrl: string | undefined = args.attributes.url;

  if (args.attributes.attr_type_link == AttrTypeLink.blog) {
    outUrl = "/single-post";
  } else if (args.attributes.attr_type_link == AttrTypeLink.category) {
    outUrl = "/category";
  } else if (args.attributes.attr_type_link == AttrTypeLink.style) {
    outUrl = "/category";
  }

  return {
    title: args.attributes.title,
    url: outUrl,
    target: args.attributes.target,
    rel: args.attributes.attr_rel,
  };
}
