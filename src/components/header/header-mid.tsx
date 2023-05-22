import AppButton, { AppButtonColor, AppButtonKind } from "../button";

import classNames from "classnames";
import AppImage from "../img";
import AppAssets from "@/models/assets";
import AppConst from "@/models/const";
import HeaderMenuDropDown from "../header-menu-dropdown";
import { useState } from "react";
import ListTitle from "../list-title";
import AppLink from "../link";
import Search from "../search";
import {
  IconSearch,
  IconAccount,
  IconHearth,
  IconCart,
  IconEsc,
} from "../icon";
import { motion, Variants } from "framer-motion";
import CardBlog from "../card-blog";
import AppMaterialIcon, { AppMaterialIconType } from "../material-icon";

export default function HeaderMid(): JSX.Element {
  // Defint class tag
  const classMenuItem: string = "menu-item";
  const classMenuLink: string = "menu-link";
  const classMenuIcon: string = "menu-icon";
  const classMenuSub: string = "menu-sub";
  const classMenuSubFull: string = "menu-sub_full";
  const classNav: string = "nav";
  const classNavInner: string = "nav-inner";
  const classCurrent: string = "current";
  const classHasChildren: string = "has-children";
  const classChildrenLink: string = "children-link";
  const classFull: string = "full";

  // Define useState
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isShowSearch, setShowSearch] = useState<boolean>(false);

  // Method event
  function searchClick() {
    setShowSearch(!isShowSearch);
  }

  // Variants framer motion
  const navCenterVariants: Variants = {
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

  const searchVariants: Variants = {
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
              variants={navCenterVariants}
              animate={isShowSearch ? "onSearchShow" : "onSearchHidden"}
              initial={"onSearchHidden"}
              transition={{
                width: {
                  duration: 0,
                },
              }}
              className={classNames(classNavInner)}
            >
              <div
                className={classNames(
                  classMenuItem,
                  classHasChildren,
                  classCurrent
                )}
              >
                <HeaderMenuDropDown
                  title={
                    <AppLink classLink={classNames(classMenuLink, "parent")}>
                      Dropdown
                    </AppLink>
                  }
                  classChildren={classNames(classMenuSub)}
                  isCloseWhenMainClick={true}
                  isShowHover={true}
                  isOpen={false}
                >
                  <>
                    <AppLink
                      classLink={classNames(classChildrenLink, classMenuLink)}
                    >
                      About us
                    </AppLink>
                    <AppLink
                      url={"#"}
                      classLink={classNames(classChildrenLink, classMenuLink)}
                    >
                      About me
                    </AppLink>
                    <AppLink
                      classLink={classNames(classChildrenLink, classMenuLink)}
                    >
                      Contact
                    </AppLink>
                  </>
                </HeaderMenuDropDown>
              </div>
              <div className={classNames(classMenuItem, classHasChildren)}>
                <HeaderMenuDropDown
                  title={
                    <AppLink classLink={classNames(classMenuLink, "parent")}>
                      Dropdown full
                    </AppLink>
                  }
                  classChildren={classNames(classMenuSub, classMenuSubFull)}
                  isCloseWhenMainClick={false}
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
                              Shop By
                            </div>
                            <AppLink
                              classLink={classNames(
                                classChildrenLink,
                                classFull,
                                classMenuLink
                              )}
                            >
                              Plants
                            </AppLink>
                            <AppLink
                              url={"#"}
                              classLink={classNames(
                                classChildrenLink,
                                classFull,
                                classMenuLink
                              )}
                            >
                              Furniture
                            </AppLink>
                            <AppLink
                              classLink={classNames(
                                classChildrenLink,
                                classFull,
                                classMenuLink
                              )}
                            >
                              Interior
                            </AppLink>
                            <AppLink
                              classLink={classNames(
                                classChildrenLink,
                                classFull,
                                classMenuLink
                              )}
                            >
                              Design
                            </AppLink>
                            <AppLink
                              classLink={classNames(
                                classChildrenLink,
                                classFull,
                                classMenuLink
                              )}
                            >
                              Home
                            </AppLink>
                            <AppLink
                              classLink={classNames(
                                classChildrenLink,
                                classFull,
                                classMenuLink
                              )}
                            >
                              styles
                            </AppLink>
                          </div>
                        </div>
                        <div className="col col-md-10">
                          <div className={classNames("sub-showcase")}>
                            <CardBlog
                              isShowCate={true}
                              imgRadius={7}
                              thumbnail={"/images/products/prd_1.jpg"}
                            />
                            <CardBlog
                              isShowCate={true}
                              imgRadius={7}
                              thumbnail={"/images/products/prd_2.jpg"}
                            />
                            <CardBlog
                              isShowCate={true}
                              imgRadius={7}
                              thumbnail={"/images/products/prd_3.jpg"}
                            />
                            <CardBlog
                              classBoxWrap="d-lg-block d-none"
                              isShowCate={true}
                              imgRadius={7}
                              thumbnail={"/images/products/prd_4.jpg"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </HeaderMenuDropDown>
              </div>

              <div className={classNames(classMenuItem)}>
                <AppLink classLink={classMenuLink}> Chuyên gia</AppLink>
              </div>
            </motion.nav>
            <motion.div
              variants={searchVariants}
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
                isCloseWhenMainClick={true}
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
