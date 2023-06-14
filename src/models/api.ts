export default class AppApi {
  //API Blog
  static blog: string = process.env.NEXT_PUBLIC_HOST_ROOT + "/api/blogs/"; // + :id
  static blogs: string = process.env.NEXT_PUBLIC_HOST_ROOT + "/api/blogs";

  //API Category
  static categories: string =
    process.env.NEXT_PUBLIC_HOST_ROOT + "/api/categories";
  static category: string =
    process.env.NEXT_PUBLIC_HOST_ROOT + "/api/categories/"; // + :id

  //API Menus
  static menuHeaderBottom: string =
    process.env.NEXT_PUBLIC_HOST_ROOT +
    "/api/menus?populate[items][populate][attr_category][fields][0]=title,slug&populate[items][populate][attr_blog][fields][0]=title,slug&populate[items][populate][attr_style][fields][0]=title,slug&filters[slug]=menu-header-bottom";

  static menuHeaderMiddle: string =
    process.env.NEXT_PUBLIC_HOST_ROOT +
    "/api/menus?filters[slug]=menu-header-middle&nested=&populate[items][populate][attr_category][fields][0]=title,slug&populate[items][populate][attr_style][fields][0]=title,slug&populate[items][populate][attr_blog][fields][0]=title,slug&populate[items][populate][attr_category][populate][blogs][populate][thumbnail]=*&populate[items][populate][attr_category][populate][blogs][fields][0]=title,slug&populate[items][populate][attr_category][populate][blogs][sort][0]=createdAt:desc&populate[items][populate][attr_style][populate][blogs][fields][0]=title,slug&populate[items][populate][attr_style][populate][blogs][sort][0]=createdAt:desc";
}
