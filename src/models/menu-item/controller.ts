import { AttrTypeLink, MenuItemResType, MenuItemType } from ".";

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

export function sortMenuResByOrder(data: Array<MenuItemResType>) {
  // sort by order
  return data.sort((current: MenuItemResType, next: MenuItemResType) => {
    if (current.attributes.order > next.attributes.order) {
      return 1;
    }

    if (current.attributes.order < next.attributes.order) {
      return -1;
    }

    return 0;
  });
}
