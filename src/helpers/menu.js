import { ROUTER_URL } from '@/consts/router'
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
  const { attributes } = args || {}

  var outUrl = attributes?.url

  var outDocs = []

  // parse url
  if (attributes?.attr_type_link == MenuLinkType.blog) {
    outUrl = `${ROUTER_URL.blogDetail}/${
      attributes[attributes.attr_type_link]?.data?.attributes?.slug
    }`
  } else if (attributes?.attr_type_link == MenuLinkType.style) {
    outUrl = `${ROUTER_URL.style}/${
      attributes[attributes.attr_type_link]?.data?.attributes?.slug
    }`
  } else if (attributes?.attr_type_link == MenuLinkType.category) {
    outUrl = `${ROUTER_URL.category}/${
      attributes[attributes.attr_type_link]?.data?.attributes?.slug
    }`
  }

  // parse data
  if (attributes[attributes?.attr_type_link]?.data?.attributes?.blogs?.data) {
    outDocs =
      attributes[attributes?.attr_type_link]?.data?.attributes?.blogs?.data
  }

  return {
    id: args?.id,
    url: outUrl,
    parentId: attributes?.parent?.data?.id,
    title: attributes?.title,
    order: attributes?.order,
    target: attributes?.target,
    rel: attributes?.attr_rel,
    children: [],
    subLayout: attributes?.attr_layout_sub,
    docs: outDocs,
    typeLink: attributes?.attr_type_link,
  }
}
