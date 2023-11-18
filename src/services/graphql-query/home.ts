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
            id
            title
            url
            attributes {
              img {
                data {
                  id
                  attributes {
                    url
                    alternativeText
                    caption
                  }
                }
              }
              rel
              target
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

export const docHomeSEO = gql`
  query {
    pageHome {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
            metaImage {
              data {
                ...thumEntity
              }
            }
          }
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
