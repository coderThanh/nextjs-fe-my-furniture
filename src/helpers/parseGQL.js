import { ROUTER_URL } from '@/consts/router'
import { MenuLinkType } from '@/consts/type'

// ------ parseUrl - middleWare
export const middleWareUrl = (url) => {
  if (!url) return

  if (process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) {
    return `${process.env.NEXT_PUBLIC_HOST_API}${url}`
  }

  return url
}

export const parseImgEnity = (imgGQL = {}) => {
  return {
    id: imgGQL?.id,
    alt: imgGQL?.attributes?.alternativeText,
    url: middleWareUrl(imgGQL?.attributes?.url),
  }
}

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

// parse data
export const parseBlogEnity = (blogGQL) => {
  const { attributes } = blogGQL || {}

  var styles = []

  if (attributes?.styles?.data) {
    styles = attributes?.styles?.data?.map((item) => parseStyleyEnity(item))
  }

  var categories = []

  if (attributes?.categories?.data) {
    categories = attributes?.categories?.data?.map((item) =>
      parseCategoryEnity(item),
    )
  }

  return {
    id: blogGQL?.id,
    title: attributes?.title,
    slug: attributes?.slug
      ? `${ROUTER_URL.blogDetail}/${attributes?.slug}`
      : null,
    thumbnail: parseImgEnity(attributes?.thumbnail?.data),
    styles: styles,
    categories: categories,
  }
}

// parse data
export const parseCategoryEnity = (categoryGQL) => {
  const { attributes } = categoryGQL || {}

  return {
    title: attributes?.title,
    slug: attributes?.slug
      ? `${ROUTER_URL.category}/${attributes?.slug}`
      : null,
    id: categoryGQL?.id,
    thumbnail: parseImgEnity(attributes?.thumbnail?.data),
  }
}

// parse data
export const parseStyleyEnity = (styleGQL) => {
  const { attributes } = styleGQL || {}

  return {
    title: attributes?.title,
    slug: attributes?.slug ? `${ROUTER_URL.style}/${attributes?.slug}` : null,
    id: styleGQL?.id,
    thumbnail: parseImgEnity(attributes?.thumbnail?.data),
  }
}

// parse data
export const parseBlogByEntity = (blogByItemGQL) => {
  var blogs = []
  var title = ''
  var slug = ''
  var id

  if (blogByItemGQL?.category?.data) {
    const category = parseCategoryEnity(blogByItemGQL?.category?.data)

    id = category.id
    title = category.title
    slug = category.slug

    if (blogByItemGQL?.category?.data?.attributes?.blogs?.data) {
      blogs = blogByItemGQL?.category?.data?.attributes?.blogs?.data?.map(
        (item) => parseBlogEnity(item),
      )
    }
    // blogs = category.blogs
  } else if (blogByItemGQL?.style?.data) {
    const style = parseStyleyEnity(blogByItemGQL?.style?.data)

    id = style.id
    title = style.title
    slug = style.slug

    if (blogByItemGQL?.style?.data?.attributes?.blogs?.data) {
      blogs = blogByItemGQL?.style?.data?.attributes?.blogs?.data?.map((item) =>
        parseBlogEnity(item),
      )
    }
  }

  return {
    title: title,
    slug: slug,
    blogs: blogs,
    id: id,
  }
}

// ---------
export const parsePagination = (pagiGQL) => {
  return {
    limit: pagiGQL?.pageSize,
    total: pagiGQL?.total,
  }
}

// ---------
export const parseQueryBlogList = (blogsGQL, pagiGQL) => {
  var items = []

  if (blogsGQL) {
    items = blogsGQL.map((item) => parseBlogEnity(item))
  }

  return {
    items: items,
    ...parsePagination(pagiGQL),
  }
}

// -----
export const parseSEO = (seoGQL) => {
  return {
    title: seoGQL?.metaTitle ?? '',
    description: seoGQL?.metaDescription ?? '',
  }
}
