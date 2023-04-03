import classNames from "classnames";
import { useState } from "react";
import CardBlog from "../card-blog";
import HeaderMenuDropDown from "../header-menu-dropdown";
import AppLink from "../link";
import styles from "./header.module.scss";

export default function HeaderBottom(): JSX.Element {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  return (
    <div className={classNames("container", styles.bottom)}>
      <div className={classNames(styles.bottomNavLeft)}>
        <div className={classNames(styles.item, styles.current)}>
          <AppLink classLink={classNames(styles.link)}>Trang chủ</AppLink>
        </div>
        <div className={classNames(styles.item)}>
          <AppLink url={"#"} classLink={classNames(styles.link)}>
            Chuyện nhà
          </AppLink>
        </div>
        <div className={classNames(styles.item)}>
          <HeaderMenuDropDown
            title={
              <AppLink url={"#"} classLink={classNames(styles.link)}>
                Menu Dropdown
              </AppLink>
            }
            isOpen={isDropDownOpen}
            classChildren={classNames(styles.menuSub)}
            isCloseWhenMainClick={true}
            isShowHover={true}
          >
            <>
              <AppLink classLink={classNames(styles.childrenLink, styles.link)}>
                About us
              </AppLink>
              <AppLink
                url={"#"}
                classLink={classNames(styles.childrenLink, styles.link)}
              >
                About me
              </AppLink>
              <AppLink classLink={classNames(styles.childrenLink, styles.link)}>
                Contact
              </AppLink>
            </>
          </HeaderMenuDropDown>
        </div>
        <div className={classNames(styles.item)}>
          <HeaderMenuDropDown
            title={
              <AppLink classLink={classNames(styles.link)}>
                Blog Dropdown full
              </AppLink>
            }
            isOpen={isDropDownOpen}
            classChildren={classNames(styles.menuSub, styles.menuSubFull)}
            isCloseWhenMainClick={false}
            isShowHover={true}
            isSubFullWidth={true}
          >
            <>
              <div
                className={classNames("container", styles.menuSubFullContainer)}
              >
                <div className={classNames("row")}>
                  <div className="col col-12 col-md-2">
                    <div className={classNames(styles.menuSubNav)}>
                      <div className={classNames(styles.menuSubTitle)}>
                        Shop By
                      </div>
                      <AppLink
                        classLink={classNames(
                          styles.childrenLinkFull,
                          styles.link
                        )}
                      >
                        Plants
                      </AppLink>
                      <AppLink
                        url={"#"}
                        classLink={classNames(
                          styles.childrenLinkFull,
                          styles.link
                        )}
                      >
                        Furniture
                      </AppLink>
                      <AppLink
                        classLink={classNames(
                          styles.childrenLinkFull,
                          styles.link
                        )}
                      >
                        Interior
                      </AppLink>
                      <AppLink
                        classLink={classNames(
                          styles.childrenLinkFull,
                          styles.link
                        )}
                      >
                        Design
                      </AppLink>
                      <AppLink
                        classLink={classNames(
                          styles.childrenLinkFull,
                          styles.link
                        )}
                      >
                        Home
                      </AppLink>
                      <AppLink
                        classLink={classNames(
                          styles.childrenLinkFull,
                          styles.link
                        )}
                      >
                        styles
                      </AppLink>
                    </div>
                  </div>
                  <div className="col col-md-10">
                    <div className={classNames(styles.menuSubShowCase)}>
                      <CardBlog thumbnail={"/images/products/prd_1.jpg"} />
                      <CardBlog thumbnail={"/images/products/prd_2.jpg"} />
                      <CardBlog thumbnail={"/images/products/prd_3.jpg"} />
                      <CardBlog thumbnail={"/images/products/prd_4.jpg"} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </HeaderMenuDropDown>
        </div>
        <div className={classNames(styles.item)}>
          <AppLink classLink={classNames(styles.link)}>Product name</AppLink>
        </div>
        <div className={classNames(styles.item)}>
          <AppLink classLink={classNames(styles.link)}>Minimalism</AppLink>
        </div>
        <div className={classNames(styles.item)}>
          <AppLink classLink={classNames(styles.link)}>Japandi</AppLink>
        </div>
        <div className={classNames(styles.item)}>
          <AppLink classLink={classNames(styles.link)}>Scandinavian</AppLink>
        </div>
      </div>
    </div>
  );
}
