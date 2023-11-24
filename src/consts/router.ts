import { Route } from 'next'

export const ROUTER_URL = {
  home: '/' as Route,
  category: '/danh-muc' as Route,
  style: '/phong-cach' as Route,
  blogDetail: '/bai-viet' as Route,
  searchBlog: '/tim-kiem-bai-viet' as Route,
  blogs: '/blogs' as Route,

  // demo
  categoryDemo: '/danh-muc/demo' as Route,
  blogDetailDemo: '/bai-viet/demo' as Route,
  searchBlogDemo: '/tim-kiem-bai-viet-demo' as Route,
}
