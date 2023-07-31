import { MenuLinkType } from '@/consts/type'

export const parseMenu = (list = []) => {
  let loopMenu = list.map((item) => {
    return parseMenuItem(item)
  })

  loopMenu = loopMenu.sort((a, b) => {
    if (a.order < b.order) return -1
    if (a.order > b.order) return 1

    return 0
  })

  loopMenu = loopMenu.map((item, index) => {
    if (item.parentId) {
      const indexOf = loopMenu.findIndex((parent) => {
        return parent.id == item.parentId
      })

      if (indexOf != -1) {
        loopMenu[indexOf].children.push(item)
        return null
      }

      return item
    }

    return item
  })

  loopMenu = loopMenu.filter((n) => n)

  return loopMenu
}

//
export function parseMenuItem(args) {
  var outUrl = args.attributes?.url

  var outDocs = []

  if (
    args.attributes?.attr_type_link &&
    args.attributes?.attr_type_link != MenuLinkType.link
  ) {
    outUrl =
      args?.attributes[args.attributes.attr_type_link]?.data?.attributes?.slug

    if (
      args?.attributes[args.attributes.attr_type_link]?.data?.attributes?.blogs
        ?.data
    ) {
      outDocs =
        args?.attributes[args.attributes.attr_type_link]?.data?.attributes
          ?.blogs?.data
    }
  }

  return {
    id: args?.id,
    url: outUrl,
    parentId: args?.attributes?.parent?.data?.id,
    title: args?.attributes?.title,
    order: args?.attributes?.order,
    target: args?.attributes?.target,
    rel: args?.attributes?.attr_rel,
    children: [],
    subLayout: args?.attributes?.attr_layout_sub,
    docs: outDocs,
    typeLink: args?.attributes?.attr_type_link,
  }
}

//
export function parseToMenuItemTypeDocs(args) {
  var outUrl = args.attributes.url
  var outChildren = []
  var outDocs = []
  var outDocType

  // Url
  if (args.attributes.attr_type_link == MenuItemTypeLink.blog) {
    outUrl = '/single-post'
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.category) {
    outUrl = '/category'
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.style) {
    outUrl = '/category'
  }

  //docs
  if (
    args.attributes.attr_type_link == MenuItemTypeLink.category &&
    args.attributes.attr_category?.data?.attributes.blogs?.data
  ) {
    args.attributes.attr_category.data.attributes.blogs.data.forEach(
      (docItem) => {
        outDocs.push(docItem)
      },
    )
    outDocType = DocType.blog
  } else if (
    args.attributes.attr_type_link == MenuItemTypeLink.style &&
    args.attributes.attr_style?.data?.attributes.blogs?.data
  ) {
    args.attributes.attr_style.data.attributes.blogs.data.forEach((docItem) => {
      outDocs.push(docItem)
    })
    outDocType = DocType.blog
  }

  // Chilren
  if (args.attributes.children && args.attributes.children.data.length > 0) {
    args.attributes.children.data.forEach((child) => {
      const childParsed = parseToMenuItemTypeDocs(child)
      outChildren.push(childParsed)
    })
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
  }
}
