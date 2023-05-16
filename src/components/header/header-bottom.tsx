import classNames from "classnames";
import { useState } from "react";
import CardBlog from "../card-blog";
import HeaderMenuDropDown from "../header-menu-dropdown";
import AppLink from "../link";
import { current } from "@reduxjs/toolkit";

export default function HeaderBottom(): JSX.Element {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  // Defint class tag
  const classMenuItem: string = "menu-item";
  const classMenuLink: string = "menu-link";
  const classNav = "nav";
  const classCurrent = "current";

  return (
    <div className={"container-lg header-bot desk"}>
      <div className={"bot-inner"}>
        <div className={classNames("bot-nav_left", classNav)}>
          <div className={classNames(classMenuItem, classCurrent)}>
            <AppLink classLink={classMenuLink}>Trang chủ</AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink url={"#"} classLink={classMenuLink}>
              Chuyện nhà
            </AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink url={"#"} classLink={classMenuLink}>
              Wabi sabi
            </AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink classLink={classMenuLink}>Mid Centry</AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink classLink={classMenuLink}>Product name</AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink classLink={classMenuLink}>Minimalism</AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink classLink={classMenuLink}>Japandi</AppLink>
          </div>
          <div className={classMenuItem}>
            <AppLink classLink={classMenuLink}>Scandinavian</AppLink>
          </div>
        </div>
      </div>
    </div>
  );
}
