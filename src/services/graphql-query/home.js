import { gql } from 'graphql-request'

export const docHomeHotBlogs = gql`
  query {
    pageHome {
      data {
        attributes {
          hot_blogs {
            data {
              id
              attributes {
                title
                slug
                thumbnail {
                  data {
                    id
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const docHomeHotBanner = gql`
  query {
    pageHome {
      data {
        attributes {
          hot_banner {
            data {
              id
              attributes {
                url
                alternativeText
              }
            }
          }
        }
      }
    }
  }
`

export const docHomeBlogBy = gql`
  query {
    pageHome {
      data {
        attributes {
          blog_by {
            ... on ComponentBlogsBlogs {
              category {
                data {
                  id
                  attributes {
                    title
                    slug
                    blogs(pagination: { limit: 6 }, sort: "createdAt:desc") {
                      data {
                        ...blogEntity
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentBlogsBlogsByStyle {
              style {
                data {
                  id
                  attributes {
                    title
                    slug
                    blogs(pagination: { limit: 6 }, sort: "createdAt:desc") {
                      data {
                        ...blogEntity
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment blogEntity on BlogEntity {
    id
    attributes {
      createdAt
      title
      slug
      styles(pagination: { limit: 1 }) {
        data {
          id
          attributes {
            title
          }
        }
      }
      categories(pagination: { limit: 1 }) {
        data {
          id
          attributes {
            title
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
