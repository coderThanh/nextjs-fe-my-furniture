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
    $tagIds: [ID]
    $tagSlug: String
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
          { tags: { or: { slug: { eq: $tagSlug }, id: { in: $tagIds } } } }
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

// ----
export const docBlogsRelated = gql`
  query blogsRelated(
    $limit: Int!
    $skip: Int
    $categoryIds: [ID]
    $styleIds: [ID]
    $exceptIds: [ID]
  ) {
    blogs(
      pagination: { limit: $limit, start: $skip }
      sort: "createdAt:desc"
      filters: {
        and: [
          { id: { notIn: $exceptIds } }
          {
            or: [
              { categories: { id: { in: $categoryIds } } }
              { styles: { id: { in: $styleIds } } }
            ]
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
