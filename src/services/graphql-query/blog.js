import { gql } from 'graphql-request'

export const docBlogs = gql`
  # Write your query or mutation here
  query blogs(
    $searchOption: BlogFiltersInput
    $pagination: PaginationArg
    $sort: [String]
  ) {
    blogs(pagination: $pagination, sort: $sort, filters: $searchOption) {
      data {
        ...blogEntity
      }
      meta {
        pagination {
          pageSize
          total
        }
      }
    }
  }

  fragment blogEntity on BlogEntity {
    id
    attributes {
      createdAt
      updatedAt
      title
      slug
      styles(pagination: { limit: 1 }) {
        data {
          id
          attributes {
            title
            slug
          }
        }
      }
      categories(pagination: { limit: 1 }) {
        data {
          id
          attributes {
            title
            slug
            thumbnail {
              data {
                ...thumEntity
              }
            }
          }
        }
      }
      thumbnail {
        data {
          ...thumEntity
        }
      }
    }
  }

  fragment thumEntity on UploadFileEntity {
    id
    attributes {
      url
      alternativeText
    }
  }
`

//
export const docBlogDetail = gql`
  query blogDetail($slug: String!) {
    blogs(filters: { slug: { eq: $slug } }, pagination: { pageSize: 1 }) {
      data {
        id
        attributes {
          title
          slug
          createdAt
          updatedAt
          thumbnail {
            data {
              id
              attributes {
                url
                alternativeText
              }
            }
          }
          categories(pagination: { limit: 12 }) {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          styles(pagination: { limit: 12 }) {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          tags(pagination: { limit: 12 }) {
            data {
              id
              attributes {
                slug
                title
              }
            }
          }
          expect
          content
        }
      }
    }
  }
`
