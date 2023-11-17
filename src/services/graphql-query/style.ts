import { gql } from 'graphql-request'

export const docsStyleDetail = gql`
  query style($slug: String!) {
    styles(filters: { and: { slug: { eq: $slug } } }) {
      data {
        id
        attributes {
          title
          slug
          expect
          content
        }
      }
    }
  }
`
