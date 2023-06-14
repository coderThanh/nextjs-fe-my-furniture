import { gql } from "graphql-request";

export class GraphQLFrament {
  static UploadFileEntry: string = gql`
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
  `;

  static BlogBoxEntry: string = gql`
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
      }
    }

    ${this.UploadFileEntry}
  `;

  static MenuItemEntry: string = gql`
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
  `;

  static MenuItemHasDocsEntry: string = gql`
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

    ${this.BlogBoxEntry}
  `;
}
