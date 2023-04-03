import AppButton, { AppButtonColor, AppButtonKind } from "../button";
import styles from "./header.module.scss";

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
  IconMenu,
  IconEsc,
} from "../icon";
import { motion, Variants } from "framer-motion";

export default function HeaderMid(): JSX.Element {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const [isShowSearch, setShowSearch] = useState<boolean>(false);

  // Menthode
  function searchClick() {
    setShowSearch(!isShowSearch);
  }

  // Variants
  const navCenterVariants: Variants = {
    onSearchShow: {
      x: -100,
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
      width: 0,
      flexWrap: "nowrap",
      overflow: "hidden",
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
      <div className={classNames("container ", styles.mid)}>
        <div className={classNames(styles.logo)}>
          <AppLink>
            <AppImage
              src={AppAssets.imgLogoDark}
              alt={AppConst.titleDefault}
              width={240}
              height={60}
              styleImg={{ objectFit: "contain", objectPosition: "left" }}
              priority={true}
            />
          </AppLink>
        </div>

        <div className={classNames(styles.midNavCenter)}>
          <motion.nav
            variants={navCenterVariants}
            animate={isShowSearch ? "onSearchShow" : "onSearchHidden"}
            initial={"onSearchHidden"}
            transition={{
              width: {
                duration: 0,
              },
            }}
            className={classNames(styles.navInner)}
          >
            <div className={classNames(styles.item, styles.current)}>
              <AppLink url={"/"} classLink={styles.link}>
                Cộng đồng
              </AppLink>
            </div>
            <div className={classNames(styles.item)}>
              <AppLink classLink={styles.link}> Shop</AppLink>
            </div>
            <div className={classNames(styles.item)}>
              <AppLink classLink={styles.link}> Chuyên gia</AppLink>
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
            className={classNames(styles.searchForm)}
          >
            <Search />
          </motion.div>
        </div>

        <div className={classNames(styles.midNavRight)}>
          <div className={classNames(styles.item)}>
            <AppButton
              kind={AppButtonKind.default}
              color={isShowSearch ? AppButtonColor.dark : AppButtonColor.white}
              classContentWrap={classNames(styles.itemIconWrap)}
              onClick={searchClick}
            >
              <>
                {!isShowSearch && (
                  <IconSearch className={classNames(styles.itemIcon)} />
                )}
                {isShowSearch && (
                  <IconEsc className={classNames(styles.itemIcon)} />
                )}
              </>
            </AppButton>
          </div>
          <div className={classNames(styles.item)}>
            <HeaderMenuDropDown
              title={
                <AppButton
                  kind={AppButtonKind.default}
                  color={AppButtonColor.white}
                >
                  <IconAccount className={classNames(styles.itemIcon)} />
                </AppButton>
              }
              isOpen={isAccountOpen}
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              classChildren={classNames(styles.menuSub)}
              isCloseWhenMainClick={true}
              isShowHover={true}
            >
              <ListTitle
                classNameText={styles.listText}
                text={"Đăng nhập"}
                style={{ borderRadius: 5 }}
                iconMaterial={
                  <span className="material-icons-outlined">play_circle</span>
                }
              ></ListTitle>
              <ListTitle
                text={"Đăng xuất"}
                style={{ borderRadius: 5 }}
                classNameText={styles.listText}
                iconMaterial={
                  <span className="material-icons-outlined">open_in_new</span>
                }
              ></ListTitle>
              <ListTitle
                classNameText={styles.listText}
                text={"Thông tin"}
                style={{ borderRadius: 5 }}
                iconMaterial={
                  <span className="material-icons-outlined">settings</span>
                }
              ></ListTitle>
              <ListTitle
                classNameText={styles.listText}
                text={"Đơn hàng"}
                style={{ borderRadius: 5 }}
              ></ListTitle>
            </HeaderMenuDropDown>
          </div>
          <div className={classNames(styles.item)}>
            <AppButton
              kind={AppButtonKind.default}
              color={AppButtonColor.white}
              classContentWrap={classNames(styles.itemIconWrap)}
            >
              <>
                <IconHearth className={classNames(styles.itemIcon)} />
                <span className={classNames(styles.number)}>3</span>
              </>
            </AppButton>
          </div>
          <div className={classNames(styles.item)}>
            <AppButton
              kind={AppButtonKind.default}
              color={AppButtonColor.white}
              classContentWrap={classNames(styles.itemIconWrap)}
            >
              <>
                <IconCart className={classNames(styles.itemIcon)} />
                <span className={classNames(styles.number)}>30</span>
              </>
            </AppButton>
          </div>

          <div className={classNames(styles.item)}>
            <AppButton
              kind={AppButtonKind.default}
              color={AppButtonColor.white}
              classContentWrap={classNames(styles.itemIconWrap)}
            >
              <IconMenu />
            </AppButton>
          </div>
        </div>
      </div>
    </>
  );
}
