import { gql } from 'graphql-request'

export const docsFooterCopyRight = gql`
  query ThemeFooterCopyRight {
    theme {
      data {
        attributes {
          footer_copyright
        }
      }
    }
  }
`

export const docsFooteScript = gql`
  query FooteScript {
    theme {
      data {
        attributes {
          hook_footer
        }
      }
    }
  }
`
