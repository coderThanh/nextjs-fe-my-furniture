import { gql } from 'graphql-request'

export const docMenu = gql`
  query GetMenuHeader(
    $slug: String!
    $menuSize: Int!
    $isShowDataRelate: Boolean!
    $dataSize: Int
  ) {
    menusMenuItems(
      filters: { root_menu: { slug: { eq: $slug } } }
      pagination: { pageSize: $menuSize }
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
            blogs(pagination: { pageSize: $dataSize }, sort: "createdAt:desc")
              @include(if: $isShowDataRelate) {
              data {
                ...BlogBoxEntry
              }
            }
          }
        }
      }
      parent {
        data {
          id
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
