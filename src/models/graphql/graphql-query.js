import { gql } from 'graphql-request'

export default class GraphQLQuery {
  static getMenuHeaderParent = gql`
    query GetMenuHeader($slug: String!) {
      menusMenus(filters: { slug: { eq: $slug } }) {
        data {
          id
          attributes {
            items(
              pagination: { pageSize: 50 }
              sort: "order:asc"
              filters: { parent: { id: { eq: null } } }
            ) {
              data {
                ...MenuItemEntry
              }
            }
          }
        }
      }
    }

    fragment MenuItemEntry on MenusMenuItemEntity {
      id
      attributes {
        title
        url
        order
        target
        attr_layout_sub
        attr_type_link
        attr_rel
        attr_category {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        attr_blog {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        attr_style {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
      }
    }
  `

  static getMenuItemsByIdParent = gql`
    query GetMenuItemsByIdParent($id: ID!, $isShowDataRelate!) {
      menusMenuItems(
        filters: { parent: { id: { eq: $id } } }
        sort: "order:asc"
      ) {
        data {
          ...MenuItemHasDocsEntry
        }
      }
    }

    fragment MenuItemHasDocsEntry on MenusMenuItemEntity {
      id
      attributes {
        title
        url
        order
        target
        attr_layout_sub
        attr_type_link
        attr_rel
        attr_category {
          data {
            id
            attributes {
              title
              slug
              blogs(pagination: { pageSize: 4 }, sort: "createdAt:desc")
                @include(if: $isShowDataRelate) {
                data {
                  ...BlogBoxEntry
                }
              }
            }
          }
        }
        attr_blog {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        attr_style {
          data {
            id
            attributes {
              title
              slug
              blogs(pagination: { pageSize: 4 }, sort: "createdAt:desc")
                @include(if: $isShowDataRelate) {
                data {
                  ...BlogBoxEntry
                }
              }
            }
          }
        }
      }
    }

    fragment BlogBoxEntry on BlogEntity {
      id
      attributes {
        title
        slug
        createdAt
        thumbnail {
          ...UploadFileEntry
        }
        categories(pagination: { pageSize: 1 }) {
          data {
            id
            attributes {
              title
              slug
              thumbnail {
                ...UploadFileEntry
              }
            }
          }
        }
        styles(pagination: { pageSize: 1 }) {
          data {
            id
            attributes {
              title
              slug
              createdAt
              updatedAt
            }
          }
        }
      }
    }

    fragment UploadFileEntry on UploadFileEntityResponse {
      data {
        id
        attributes {
          url
          caption
          alternativeText
          ext
          width
          height
        }
      }
    }
  `

  static getPageHomeData = gql`
    query GetPageHomeData($numbers: Int!) {
      pageHome {
        data {
          attributes {
            hot_blogs {
              data {
                id
                attributes {
                  title
                  slug
                  createdAt
                  thumbnail {
                    ...UploadFileEntry
                  }
                }
              }
            }
            hot_banner {
              ...UploadFileEntry
            }
            categories {
              data {
                id
                attributes {
                  title
                  slug
                  thumbnail {
                    ...UploadFileEntry
                  }
                  blogs(
                    sort: "createdAt:desc"
                    pagination: { pageSize: $numbers }
                  ) {
                    data {
                      ...BlogQueryEntity
                    }
                  }
                }
              }
            }
            styles {
              data {
                id
                attributes {
                  title
                  slug
                  blogs(
                    sort: "createdAt:desc"
                    pagination: { pageSize: $numbers }
                  ) {
                    data {
                      ...BlogQueryEntity
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    fragment BlogQueryEntity on BlogEntity {
      id
      attributes {
        title
        slug
        createdAt
        thumbnail {
          ...UploadFileEntry
        }
        categories(pagination: { pageSize: 1 }) {
          data {
            id
            attributes {
              title
              slug
              thumbnail {
                ...UploadFileEntry
              }
            }
          }
        }
        styles(pagination: { pageSize: 1 }) {
          data {
            id
            attributes {
              title
              slug
              createdAt
              updatedAt
            }
          }
        }
      }
    }

    fragment UploadFileEntry on UploadFileEntityResponse {
      data {
        id
        attributes {
          url
          caption
          alternativeText
          ext
          width
          height
        }
      }
    }
  `
}
