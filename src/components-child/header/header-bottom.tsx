import classNames from "classnames";
import AppLink from "@/components-root/link";
import { MenuItemResType, MenuItemType } from "@/models/menu-item";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";
import {
  parseToMenuItem,
  sortMenuResByOrder,
} from "@/models/menu-item/controller";

const dataDemo: Array<MenuItemType> = [
  { title: "Trang chủ", url: "/", target: "" },
  {
    title: "Chuyện nhà",
    url: "/category",
    target: "_blank",
    rel: "nofollow",
  },
  { title: "Xu hướng", url: "/category", target: "" },
  { title: "Zen", url: "/category", target: "" },
  { title: "Wabi sabi", url: "/category", target: "" },
  { title: "Mid Centry", url: "/category", target: "" },
  { title: "Minimalism", url: "/category", target: "" },
  { title: "Scandinavian", url: "/category", target: "" },
  { title: "Tin tức", url: "/category", target: "" },
  { title: "Liên hệ", url: "#", target: "" },
];

export default function HeaderBottom(): JSX.Element {
  var listMenu: Array<MenuItemType> = [];

  const { data } = useSWR<any, Error>(
    process.env.NEXT_PUBLIC_API_MENU_HEADER_BOTTOM,
    fetcher
  );

  if (!process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) {
    listMenu.push(...dataDemo);
  } else if (data) {
    const dataMenuBottom: Array<MenuItemResType> = sortMenuResByOrder(
      data.data.attributes.items.data
    );

    dataMenuBottom.forEach((item: MenuItemResType) => {
      listMenu.push(parseToMenuItem(item));
    });
  }

  return (
    <div className={"container-lg header-bot desk"}>
      <div className={"bot-inner"}>
        <div className={classNames("bot-nav_left", "nav")}>
          {listMenu.map((item, index) => (
            <div key={index} className={classNames("menu-item")}>
              <AppLink
                url={item.url}
                classLink={"menu-link"}
                target={item.target}
                rel={item.rel}
              >
                {item.title}
              </AppLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
