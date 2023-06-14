import {
  MenuItemTypeLink,
  MenuItemResType,
  MenuItemType,
  MenuItemTypeDocs,
  MenuItemBlogs,
  DocType,
} from "./menu-item";

//
export function parseToMenuItem(args: MenuItemResType): MenuItemType {
  var outUrl: string | undefined = args.attributes.url;
  var outChildren: Array<MenuItemType> = [];

  if (args.attributes.attr_type_link == MenuItemTypeLink.blog) {
    outUrl = "/single-post";
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.category) {
    outUrl = "/category";
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.style) {
    outUrl = "/category";
  }

  if (args.attributes.children && args.attributes.children.data.length > 0) {
    args.attributes.children.data.forEach((child) => {
      outChildren.push(parseToMenuItem(child));
    });
  }

  return {
    title: args.attributes.title,
    url: outUrl,
    target: args.attributes.target,
    rel: args.attributes.attr_rel,
    children: { data: outChildren },
    subLayout: args.attributes.attr_layout_sub,
  };
}

//
export function parseToMenuItemTypeDocs(
  args: MenuItemResType
): MenuItemTypeDocs {
  var outUrl: string | undefined = args.attributes.url;
  var outChildren: Array<MenuItemType> = [];
  var outDocs: Array<any> = [];
  var outDocType: DocType | undefined;

  // Url
  if (args.attributes.attr_type_link == MenuItemTypeLink.blog) {
    outUrl = "/single-post";
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.category) {
    outUrl = "/category";
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.style) {
    outUrl = "/category";
  }

  //docs
  if (
    args.attributes.attr_type_link == MenuItemTypeLink.category &&
    args.attributes.attr_category?.data?.attributes.blogs?.data
  ) {
    args.attributes.attr_category.data.attributes.blogs.data.forEach(
      (docItem: MenuItemBlogs) => {
        outDocs.push(docItem);
      }
    );
    outDocType = DocType.blog;
  } else if (
    args.attributes.attr_type_link == MenuItemTypeLink.style &&
    args.attributes.attr_style?.data?.attributes.blogs?.data
  ) {
    args.attributes.attr_style.data.attributes.blogs.data.forEach(
      (docItem: MenuItemBlogs) => {
        outDocs.push(docItem);
      }
    );
    outDocType = DocType.blog;
  }

  // Chilren
  if (args.attributes.children && args.attributes.children.data.length > 0) {
    args.attributes.children.data.forEach((child) => {
      const childParsed = parseToMenuItemTypeDocs(child);
      outChildren.push(childParsed);
    });
  }

  return {
    title: args.attributes.title,
    url: outUrl,
    target: args.attributes.target,
    rel: args.attributes.attr_rel,
    children: { data: outChildren },
    subLayout: args.attributes.attr_layout_sub,
    docs: outDocs,
    docType: outDocType,
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
