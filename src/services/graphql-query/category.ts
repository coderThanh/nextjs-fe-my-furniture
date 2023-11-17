import { gql } from 'graphql-request'

export const docsCategoryDetail = gql`
  query category($slug: String!) {
    categories(filters: { and: { slug: { eq: $slug } } }) {
      data {
        id
        attributes {
          title
          slug
          expect
          thumbnail {
            data {
              ...thumEntity
            }
          }
          content
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
