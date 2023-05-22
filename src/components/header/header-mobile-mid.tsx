import classNames from "classnames";
import AppLink from "../link";
import AppImage from "../img";
import AppAssets from "@/models/assets";
import AppConst from "@/models/const";
import AppButton, { AppButtonColor, AppButtonKind } from "../button";
import { IconCart, IconMenu } from "../icon";
import WindownE from "../windown";
import { ReactElement } from "react";
import ListTitle from "../list-title";
import WindownSecondE from "../windown/windown-second";
import Search from "../search";

export default function HeaderMobileMid(): JSX.Element {
  // Defint class tag
  const classMenuItem: string = "menu-item";
  const classMenuLink: string = "menu-link";
  const classMenuIcon: string = "menu-icon";
  const classMenuListTitle: string = "menu-l-title";
  const classNav: string = "nav";
  const classNavInner: string = "nav-inner";

  // Demo menu item
  const demoMenuItem: ReactElement = (
    <>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Scandinavian
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Japandi
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Minimalism
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Xu hướng
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Thảo luận
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Mid centry
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={"/category"} classLink={classNames(classMenuLink)}>
          Ngẫu nhiên
        </AppLink>
      </div>
    </>
  );

  return (
    <>
      <div
        className={classNames("container-lg", "d-md-none", "header-mid mobile")}
      >
        <div className={classNames("header-mid-inner")}>
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
          <div className={classNames(classNav, "right")}>
            <div className={classNames(classNavInner)}>
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
              <div className={classNames(classMenuItem)}>
                <WindownE
                  classWrap="header-windown"
                  isShow={false}
                  neighbor={
                    <AppButton
                      kind={AppButtonKind.default}
                      color={AppButtonColor.white}
                      className={classNames(classMenuIcon)}
                    >
                      <>
                        <IconMenu className={classNames("icon")} />
                      </>
                    </AppButton>
                  }
                >
                  <>
                    <div className={classNames("windown-logo")}>
                      <AppLink classLink={classNames("logo")} url={"/"}>
                        <AppImage
                          src={AppAssets.imgLogoDark}
                          alt={AppConst.titleDefault}
                          width={200}
                          height={40}
                          styleImg={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                          priority={true}
                        />
                      </AppLink>
                    </div>

                    <div className={classNames("windown-nav", "nav")}>
                      <div className={classNames(classMenuItem, "search")}>
                        <Search />
                      </div>

                      <div className={classNames(classMenuItem, "highlight")}>
                        <WindownSecondE
                          isShow={false}
                          title={"Chuyện nhà"}
                          neighbor={
                            <ListTitle
                              text={" Chuyện nhà "}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>
                            <div
                              className={classNames(classMenuItem, "highlight")}
                            >
                              <WindownSecondE
                                isShow={false}
                                title={"Chuyện nhà"}
                                neighbor={
                                  <ListTitle
                                    text={" Chuyện nhà "}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>{demoMenuItem}</>
                              </WindownSecondE>
                            </div>
                            <div
                              className={classNames(classMenuItem, "highlight")}
                            >
                              <WindownSecondE
                                isShow={false}
                                title={"Chuyện nhà"}
                                neighbor={
                                  <ListTitle
                                    text={" Chuyện nhà "}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>{demoMenuItem}</>
                              </WindownSecondE>
                            </div>
                            <div className={classNames(classMenuItem)}>
                              <WindownSecondE
                                isShow={false}
                                title={"Chuyện nhà"}
                                neighbor={
                                  <ListTitle
                                    text={" Chuyện nhà "}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>{demoMenuItem}</>
                              </WindownSecondE>
                            </div>
                            <div className={classNames(classMenuItem)}>
                              <WindownSecondE
                                isShow={false}
                                title={"Chuyện nhà"}
                                neighbor={
                                  <ListTitle
                                    text={" Chuyện nhà "}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>{demoMenuItem}</>
                              </WindownSecondE>
                            </div>
                            <div className={classNames("nav-2nd")}>
                              {demoMenuItem}
                            </div>
                          </>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem, "highlight")}>
                        <WindownSecondE
                          isShow={false}
                          title={"Chuyện nhà 1"}
                          neighbor={
                            <ListTitle
                              text={" Chuyện nhà 1"}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem, "highlight")}>
                        <WindownSecondE
                          isShow={false}
                          title={"Chuyện nhà 2"}
                          neighbor={
                            <ListTitle
                              text={" Chuyện nhà 2"}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem)}>
                        <WindownSecondE
                          isShow={false}
                          title={"Chuyện nhà 3"}
                          neighbor={
                            <ListTitle
                              text={" Chuyện nhà 3"}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem)}>
                        <WindownSecondE
                          isShow={false}
                          title={"Chuyện nhà 4"}
                          neighbor={
                            <ListTitle
                              text={" Chuyện nhà 4"}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem)}>
                        <WindownSecondE
                          isShow={false}
                          title={"Chuyện nhà 5"}
                          neighbor={
                            <ListTitle
                              text={" Chuyện nhà 5"}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>

                      <div className={classNames("nav-2nd")}>
                        {demoMenuItem}
                      </div>
                    </div>
                  </>
                </WindownE>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
