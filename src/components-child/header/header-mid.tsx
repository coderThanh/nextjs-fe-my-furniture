import AppButton, {
  AppButtonColor,
  AppButtonKind,
} from "../../components-root/button";

import classNames from "classnames";
import AppImage from "../../components-root/img";
import AppAssets from "@/models/assets";
import AppConst from "@/models/const";
import HeaderMenuDropDown from "../../components-root/header-menu-dropdown";
import React, { ReactNode, useState } from "react";
import ListTitle from "../../components-root/list-title";
import AppLink from "../../components-root/link";
import Search from "../../components-root/search";
import {
  IconSearch,
  IconAccount,
  IconHearth,
  IconCart,
  IconEsc,
} from "../icon";
import { motion, Variants } from "framer-motion";
import CardBlog from "../card-blog";
import AppMaterialIcon, {
  AppMaterialIconType,
} from "../../components-root/material-icon";
import useSWR from "swr";
import {
  DocType,
  MenuItemResType,
  MenuItemSubLayout,
  MenuItemTypeDocs,
} from "@/models/menus/menu-item";
import { parseToMenuItemTypeDocs } from "@/models/menus/controller";
import SWRKey from "@/models/swr-key";
import { getMenuAndchildrent } from "@/services/menus";
import { BlogEntity } from "@/models/blog";

const dataDemo: Array<MenuItemTypeDocs> = [
  {
    children: {
      data: [
        {
          children: { data: [] },
          docType: undefined,
          docs: [],
          subLayout: MenuItemSubLayout.dropdown,
          title: "About",
          url: "",
        },
        {
          children: { data: [] },
          docType: undefined,
          docs: [],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Contact",
          url: "",
        },
        {
          children: { data: [] },
          docType: undefined,
          docs: [],
          subLayout: MenuItemSubLayout.dropdown,
          title: "About me",
          url: "",
        },
      ],
    },
    docType: undefined,
    docs: [],
    subLayout: MenuItemSubLayout.dropdown,
    title: "Dropdown",
    url: "",
  },
  {
    title: "Dropdown full",
    children: {
      data: [
        {
          docType: DocType.blog,
          docs: [1, 3, 4, 4],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Chuyện nhà",
          url: "",
          children: { data: [] },
        },
        {
          docType: DocType.blog,
          docs: [1, 3, 4],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Kho ảnh",
          url: "",
          children: { data: [] },
        },
        {
          docType: DocType.blog,
          docs: [1, 3, 4, 4],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Trang chủ",
          url: "",
          children: { data: [] },
        },
        {
          docType: DocType.blog,
          docs: [1, 3, 4],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Indochine",
          url: "",
          children: { data: [] },
        },
        {
          docType: DocType.blog,
          docs: [1, 2, 3, 4],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Minimalism",
          url: "",
          children: { data: [] },
        },
        {
          docType: DocType.blog,
          docs: [],
          subLayout: MenuItemSubLayout.dropdown,
          title: "Emagazine",
          url: "",
          children: { data: [] },
        },
      ],
    },
    docType: undefined,
    docs: [],
    subLayout: MenuItemSubLayout.dropdownFullWithPostRight,
    url: "",
  },
  { title: "Chuyên gia", url: "", target: "" },
];

// Defint class tag
const classMenuItem: string = "menu-item";
const classMenuLink: string = "menu-link";
const classMenuIcon: string = "menu-icon";
const classMenuSub: string = "menu-sub";
const classMenuSubFull: string = "menu-sub_full";
const classNav: string = "nav";
const classHasChildren: string = "has-children";
const classChildrenLink: string = "children-link";
const classFull: string = "full";

export default function HeaderMid(): JSX.Element {
  // Define useState
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isShowSearch, setShowSearch] = useState<boolean>(false);

  // menu
  var menuData: Array<MenuItemTypeDocs> = [];

  const { data } = useSWR<MenuItemResType[]>(
    SWRKey.headerMiddle,
    () =>
      getMenuAndchildrent(
        process.env.NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG,
        true
      ),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  if (!process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) {
    menuData.push(...dataDemo);
  } else if (data) {
    data.forEach((item) => {
      menuData.push(parseToMenuItemTypeDocs(item));
    });
  }

  // Method event
  function searchClick() {
    setShowSearch(!isShowSearch);
  }

  return (
    <>
      <div
        className={classNames(
          "container-lg",
          "header-mid desk d-none d-md-block"
        )}
      >
        <div className={classNames("mid-inner")}>
          <AppLink classLink={classNames("logo")} url={"/"}>
            <AppImage
              src={AppAssets.imgLogoDark}
              alt={AppConst.titleDefault}
              width={200}
              height={60}
              styleImg={{ objectFit: "contain", objectPosition: "left" }}
              priority={true}
            />
          </AppLink>

          <div className={classNames("mid-nav_center", classNav)}>
            <motion.nav
              variants={VariantHeaderMiddle.navCenterVariants}
              animate={isShowSearch ? "onSearchShow" : "onSearchHidden"}
              initial={"onSearchHidden"}
              transition={{
                width: {
                  duration: 0,
                },
              }}
              className={classNames("nav-inner")}
            >
              {menuData.map((item, index) => {
                var outPut: JSX.Element = <></>;

                if (
                  item.subLayout == MenuItemSubLayout.dropdown &&
                  item.children &&
                  item.children.data.length > 0
                ) {
                  outPut = <ElementMenuDropdown item={item} />;
                } else if (
                  item.subLayout ==
                    MenuItemSubLayout.dropdownFullWithPostRight &&
                  item.children &&
                  item.children.data.length > 0
                ) {
                  outPut = <ElementMenuDropdownFull item={item} />;
                } else {
                  outPut = (
                    <AppLink
                      url={item.url}
                      target={item.target}
                      rel={item.rel}
                      classLink={classNames(classMenuLink)}
                    >
                      {item.title}
                    </AppLink>
                  );
                }

                return (
                  <div
                    key={index}
                    className={classNames(
                      classMenuItem,
                      item.children?.data?.length ? classHasChildren : ""
                    )}
                  >
                    {outPut}
                  </div>
                );
              })}
            </motion.nav>
            <motion.div
              variants={VariantHeaderMiddle.searchVariants}
              animate={isShowSearch ? "onShow" : "onHidden"}
              initial="onHidden"
              transition={{
                width: {
                  duration: 0,
                },
              }}
              className={classNames("search-form")}
            >
              <Search />
            </motion.div>
          </div>

          <div className={classNames("mid-nav_right")}>
            <div className={classNames(classMenuItem)}>
              <AppButton
                kind={AppButtonKind.default}
                color={
                  isShowSearch ? AppButtonColor.dark : AppButtonColor.white
                }
                className={classNames("btn-icon")}
                onClick={searchClick}
              >
                <>
                  {!isShowSearch && (
                    <IconSearch className={classNames("icon")} />
                  )}
                  {isShowSearch && <IconEsc className={classNames("icon")} />}
                </>
              </AppButton>
            </div>
            <div className={classNames(classMenuItem)}>
              <HeaderMenuDropDown
                title={
                  <AppButton
                    kind={AppButtonKind.default}
                    color={AppButtonColor.white}
                  >
                    <IconAccount className={classNames("icon")} />
                  </AppButton>
                }
                isOpen={isAccountOpen}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                classChildren={classNames(classMenuSub)}
                isShowHover={true}
              >
                <ListTitle
                  classNameText={"list-title"}
                  text={"Đăng nhập"}
                  iconMaterial={
                    <AppMaterialIcon type={AppMaterialIconType.outlined}>
                      play_circle
                    </AppMaterialIcon>
                  }
                ></ListTitle>
                <ListTitle
                  text={"Đăng xuất"}
                  classNameText={"list-title"}
                  iconMaterial={
                    <AppMaterialIcon type={AppMaterialIconType.outlined}>
                      open_in_new
                    </AppMaterialIcon>
                  }
                ></ListTitle>
                <ListTitle
                  classNameText={"list-title"}
                  text={"Thông tin"}
                  iconMaterial={
                    <AppMaterialIcon type={AppMaterialIconType.outlined}>
                      settings
                    </AppMaterialIcon>
                  }
                ></ListTitle>
                <ListTitle
                  classNameText={"list-title"}
                  text={"Đơn hàng"}
                ></ListTitle>
              </HeaderMenuDropDown>
            </div>
            <div className={classNames(classMenuItem)}>
              <AppButton
                kind={AppButtonKind.default}
                color={AppButtonColor.white}
                className={classNames(classMenuIcon)}
              >
                <>
                  <IconHearth className={classNames("icon")} />
                  <span className={classNames("number")}>3</span>
                </>
              </AppButton>
            </div>
            <div className={classNames(classMenuItem)}>
              <AppButton
                kind={AppButtonKind.default}
                color={AppButtonColor.white}
                className={classNames(classMenuIcon)}
              >
                <>
                  <IconCart className={classNames("icon")} />
                  <span className={classNames("number")}>30</span>
                </>
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ElementMenuDropdown(props: { item: MenuItemTypeDocs }): JSX.Element {
  return (
    <>
      <HeaderMenuDropDown
        title={
          <AppLink
            url={props.item.url}
            target={props.item.target}
            rel={props.item.rel}
            classLink={classNames(classMenuLink, "parent")}
          >
            {props.item.title}
          </AppLink>
        }
        classChildren={classNames(classMenuSub)}
        isShowHover={true}
        isOpen={false}
      >
        <>
          {props.item.children?.data.map((child, index) => (
            <AppLink
              key={index}
              url={child.url}
              classLink={classNames(classChildrenLink, classMenuLink)}
              target={child.target}
              rel={child.rel}
            >
              {child.title}
            </AppLink>
          ))}
        </>
      </HeaderMenuDropDown>
    </>
  );
}

export function ElementMenuDropdownFull(props: {
  item: MenuItemTypeDocs;
}): JSX.Element {
  const [stateIndexDocsShow, setIndexDocShow] = useState<number>();

  function onHoverSubItem(docIndex?: number) {
    if (docIndex != undefined) {
      setIndexDocShow(docIndex);
    }
  }

  return (
    <>
      <HeaderMenuDropDown
        title={
          <AppLink
            url={props.item.url}
            classLink={classNames(classMenuLink, "parent")}
          >
            {props.item.title}
          </AppLink>
        }
        classChildren={classNames(classMenuSub, classMenuSubFull)}
        isShowHover={true}
        isSubFullWidth={true}
        isOpen={false}
      >
        <>
          <div className={classNames("container-lg")}>
            <div className={classNames("row")}>
              <div className="col col-12 col-md-2">
                <div className={classNames("sub-nav")}>
                  <div className={classNames("sub-title")}>
                    {props.item.title}
                  </div>
                  {props.item.children?.data.map((item, index) => (
                    <div
                      key={index}
                      className="sub-menu-item"
                      onMouseEnter={(event) =>
                        onHoverSubItem(item.docs?.length ? index : undefined)
                      }
                    >
                      <AppLink
                        url={item.url}
                        classLink={classNames(
                          classChildrenLink,
                          classFull,
                          classMenuLink
                        )}
                      >
                        {item.title}
                      </AppLink>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col col-md-10">
                <div className={classNames("sub-showcase")}>
                  {props.item.children?.data.map((item, index) => {
                    const docsShow: ReactNode = item.docs?.map(
                      (itemDoc: BlogEntity, indexChild) => {
                        return (
                          <CardBlog
                            key={indexChild}
                            isShowCate={true}
                            imgRadius={7}
                            thumbnail={`/images/products/prd_${Math.min(
                              indexChild + 1,
                              7
                            )}.jpg`}
                          />
                        );
                      }
                    );

                    if (item.docs && item.docs.length <= 0) return;

                    if (stateIndexDocsShow == undefined) setIndexDocShow(index);

                    return (
                      <div
                        key={index}
                        className={classNames(
                          "sub-showcase-item",
                          stateIndexDocsShow == index ? "active" : ""
                        )}
                        data-parent={index}
                      >
                        {docsShow}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      </HeaderMenuDropDown>
    </>
  );
}

//
class VariantHeaderMiddle {
  static navCenterVariants: Variants = {
    onSearchShow: {
      x: -100,
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
      width: 0,
      flexWrap: "nowrap",
      overflow: "hidden",
      display: "none",
    },
    onSearchHidden: {},
  };

  static searchVariants: Variants = {
    onHidden: {
      x: 100,
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
      width: 0,
    },
    onShow: {
      x: 0,
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
      width: "80%",
    },
  };
}
