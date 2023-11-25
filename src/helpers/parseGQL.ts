import { ROUTER_URL } from '@/consts/router'
import { MenuLinkType } from '@/consts/type'
import { isConnectAPI } from '@/helpers'
import { Route } from 'next'

// ------ parseUrl - middleWare
export const middleWareUrl = (url) => {
  if (!url) return

  if (isConnectAPI()) {
    return `${process.env.NEXT_PUBLIC_HOST_IMG_API}:${process.env.NEXT_PUBLIC_HOST_IMG_PORT}${url}`
  }

  return url
}

//
export type ImgEntity = {
  id: number
  alt?: string
  url?: string
}

export const parseImgEnity = (imgGQL): ImgEntity | null => {
  if (!imgGQL) return null

  return {
    id: imgGQL.id,
    alt: imgGQL?.attributes?.alternativeText ?? null,
    url: middleWareUrl(imgGQL?.attributes?.url) ?? null,
  }
}

//
export type LinkEntity = {
  id: number
  title?: string
  url?: Route
  rel?: string
  target?: string
}

interface LinkMenuEntity extends LinkEntity {
  img?: ImgEntity | null
}

export const parseLinkEntity = (linkGQL): LinkMenuEntity | null => {
  if (!linkGQL) return null

  const { attributes } = linkGQL ?? {}

  return {
    id: linkGQL?.id,
    title: linkGQL?.title,
    url: linkGQL?.url as Route,
    rel: attributes?.rel,
    target: attributes?.target,
    img: parseImgEnity(attributes?.img?.data),
  }
}

export const parseMenu = (list = []) => {
  let loopMenu: any[] = list.map((item) => {
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
    id: parseInt(args?.id),
    url: outUrl as Route,
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

// parse content
export const parseContentEditor = (content: string) => {
  return content

  // ---
  // add host img, but strapi version current not neccesscery
  // ---
  const regex = /<img(.*?src=["|'])(.*?)(["|'])/gm

  var result = content.replace(
    regex,
    `<img$1${process.env.NEXT_PUBLIC_HOST_IMG_API}:${process.env.NEXT_PUBLIC_HOST_IMG_PORT}$2$3`,
  )

  return result
}

// parse data

export type BlogEntity = {
  id: number
  title?: string
  createdAt?: string
  updatedAt?: string
  slug?: Route
  thumbnail?: ImgEntity | null
  styles?: StyleEntity[]
  categories?: CategoryEntity[]
  tags?: TagEntity[]
  expect?: string
  content?: string
}

export const parseBlogEnity = (blogGQL): BlogEntity => {
  const { attributes } = blogGQL || {}

  var styles: any[] = []
  var categories: any[] = []
  var tags: any[] = []
  var content = ''

  // Replace NEXT_PUBLIC_HOST_IMG_API
  if (attributes?.content?.length > 0) {
    content = parseContentEditor(attributes?.content)
  }

  if (attributes?.styles?.data) {
    styles = attributes?.styles?.data?.map((item) => parseStyleyEnity(item))
  }

  if (attributes?.categories?.data) {
    categories = attributes?.categories?.data?.map((item) =>
      parseCategoryEnity(item),
    )
  }

  if (attributes?.tags?.data) {
    tags = attributes?.tags?.data?.map((item) => parseTagEnity(item))
  }

  return {
    id: parseInt(blogGQL?.id),
    title: attributes?.title,
    createdAt: attributes?.createdAt,
    updatedAt: attributes?.updatedAt,
    slug: attributes?.slug
      ? (`${ROUTER_URL.blogDetail}/${attributes?.slug}` as Route)
      : undefined,
    thumbnail: parseImgEnity(attributes?.thumbnail?.data),
    styles: styles,
    categories: categories,
    tags: tags,
    expect: attributes?.expect,
    content: content,
  }
}

// parse data

export type CategoryEntity = {
  id: number
  title?: string
  slug?: Route
  thumbnail?: ImgEntity | null
  expect?: string
  content?: string
}

export const parseCategoryEnity = (categoryGQL): CategoryEntity | null => {
  const { attributes } = categoryGQL || {}

  return {
    id: parseInt(categoryGQL.id),
    title: attributes?.title ?? null,
    slug: attributes?.slug
      ? (`${ROUTER_URL.category}/${attributes?.slug}` as Route)
      : undefined,
    thumbnail: parseImgEnity(attributes?.thumbnail?.data) ?? null,
    expect: attributes?.expect ?? null,
    content: attributes?.content ?? null,
  }
}

// parse data

export type StyleEntity = {
  id: number
  title?: string
  slug?: Route | null
  thumbnail?: ImgEntity | null
  expect?: string
  content?: string
}

export const parseStyleyEnity = (styleGQL): StyleEntity | null => {
  const { attributes } = styleGQL || {}

  return {
    title: attributes?.title ?? null,
    slug: attributes?.slug
      ? (`${ROUTER_URL.style}/${attributes?.slug}` as Route)
      : null,
    id: parseInt(styleGQL.id),
    expect: attributes?.expect ?? null,
    content: attributes?.content ?? null,
  }
}

// parse data
export type TagEntity = {
  id: number
  title?: string
  slug?: Route
}

export const parseTagEnity = (tagGQL): TagEntity | null => {
  const { attributes } = tagGQL || {}

  return {
    id: parseInt(tagGQL.id),
    title: attributes?.title ?? null,
    slug: (attributes?.slug as Route) ?? null,
  }
}

// parse data
export const parseBlogByEntity = (blogByItemGQL) => {
  var blogs: BlogEntity[] = []
  var title: string | undefined | null = ''
  var slug: string | Route | null | undefined = ''
  var id: string | number | undefined = ''

  if (blogByItemGQL?.category?.data) {
    const category = parseCategoryEnity(blogByItemGQL?.category?.data)

    id = category?.id
    title = category?.title
    slug = category?.slug

    if (blogByItemGQL?.category?.data?.attributes?.blogs?.data) {
      blogs = blogByItemGQL?.category?.data?.attributes?.blogs?.data?.map(
        (item) => parseBlogEnity(item),
      )
    }
    // blogs = category.blogs
  } else if (blogByItemGQL?.style?.data) {
    const style = parseStyleyEnity(blogByItemGQL?.style?.data)

    id = style?.id
    title = style?.title
    slug = style?.slug

    if (blogByItemGQL?.style?.data?.attributes?.blogs?.data) {
      blogs = blogByItemGQL?.style?.data?.attributes?.blogs?.data?.map((item) =>
        parseBlogEnity(item),
      )
    }
  }

  return {
    id: id,
    title: title,
    slug: slug,
    blogs: blogs,
  }
}

// ---------

export const parsePagination = (pagiGQL) => {
  if (!pagiGQL) return null

  return {
    limit: pagiGQL?.pageSize,
    total: pagiGQL?.total,
  }
}

// ---------
export type QueryList<T> = {
  items?: T[]
  limit?: number
  total?: number
}

export const parseQueryBlogList = (
  blogsGQL,
  pagiGQL,
): QueryList<BlogEntity> => {
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
export type SeoEntity = {
  title?: string
  description?: string
  thumbnail?: ImgEntity | null
}

export const parseSEO = (seoGQL) => {
  if (!seoGQL) return

  return {
    title: seoGQL?.metaTitle ?? '',
    description: seoGQL?.metaDescription ?? '',
    thumbnail: parseImgEnity(seoGQL?.metaImage?.data) ?? null,
  }
}
