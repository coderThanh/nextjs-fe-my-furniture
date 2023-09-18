import { gql } from 'graphql-request'

export const docBlogs = gql`
  query blogs(
    $limit: Int!
    $skip: Int
    $keyword: String
    $categorySlug: String
    $categoryIds: [ID]
    $styleIds: [ID]
    $styleSlug: String
    $exceptIds: [ID]
  ) {
    blogs(
      pagination: { limit: $limit, start: $skip }
      sort: "createdAt:desc"
      filters: {
        and: [
          { id: { notIn: $exceptIds } }
          { title: { contains: $keyword } }
          {
            categories: {
              or: { slug: { eq: $categorySlug }, id: { in: $categoryIds } }
            }
          }
          {
            styles: { or: { slug: { eq: $styleSlug }, id: { in: $styleIds } } }
          }
        ]
      }
    ) {
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
    blogs(filters: { slug: { eq: $slug } }) {
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
          expect
          content
        }
      }
    }
  }
`
