//
export function parseToMenuItem(args) {
  var outUrl = args.attributes.url
  var outChildren = []

  if (args.attributes.attr_type_link == MenuItemTypeLink.blog) {
    outUrl = '/single-post'
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.category) {
    outUrl = '/category'
  } else if (args.attributes.attr_type_link == MenuItemTypeLink.style) {
    outUrl = '/category'
  }

  if (args.attributes.children && args.attributes.children.data.length > 0) {
    args.attributes.children.data.forEach((child) => {
      outChildren.push(parseToMenuItem(child))
    })
  }

  return {
    title: args.attributes.title,
    url: outUrl,
    target: args.attributes.target,
    rel: args.attributes.attr_rel,
    children: { data: outChildren },
    subLayout: args.attributes.attr_layout_sub,
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

export function sortMenuResByOrder(data = []) {
  // sort by order
  return data.sort((current, next) => {
    if (current.attributes.order > next.attributes.order) {
      return 1
    }

    if (current.attributes.order < next.attributes.order) {
      return -1
    }

    return 0
  })
}
