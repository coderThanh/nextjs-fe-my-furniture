import styles from "./aside.module.scss";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import ListTitle from "../list-title";
import AsideAccording from "../aside-according";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type AsideProps = {
  children?: ReactNode;
};

export default function Aside({ children }: AsideProps) {
  const [isOpenDashboard, setIsOpenDashboard] = useState(true);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenShop, setIsOpenShop] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [isOpenPortfolio, setIsOpenPortfolio] = useState(false);
  const [isOpenComponent, setIsOpenComponent] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const isOpenAside = useSelector((state: RootState) => state.aside.isLeftOpen);

  return (
    <>
      <aside
        className={classNames(styles.wrap, !isOpenAside ? styles.close : "")}
      >
        <div className={classNames(styles.inner)}>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Dashboards"}
                  isCurrent={isOpenDashboard}
                  isNotify={true}
                  iconMaterial={
                    <span className="material-icons">desktop_windows</span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenDashboard}
                ></ListTitle>
              }
              isOpen={isOpenDashboard}
              onClick={() => setIsOpenDashboard(!isOpenDashboard)}
            >
              <ListTitle text={"Dashboards child 1"}></ListTitle>
              <ListTitle text={"Dashboards child 2"}></ListTitle>
              <ListTitle text={"Dashboards child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Shop"}
                  isCurrent={isOpenShop}
                  iconMaterial={
                    <span className="material-icons-outlined">store</span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenShop}
                ></ListTitle>
              }
              isOpen={isOpenShop}
              onClick={() => setIsOpenShop(!isOpenShop)}
            >
              <ListTitle text={"Shop child 1"}></ListTitle>
              <ListTitle text={"Shop child 2"}></ListTitle>
              <ListTitle text={"Shop child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Products"}
                  isCurrent={isOpenProduct}
                  iconMaterial={
                    <span className="material-icons-outlined">inventory_2</span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenProduct}
                ></ListTitle>
              }
              isOpen={isOpenProduct}
              onClick={() => setIsOpenProduct(!isOpenProduct)}
            >
              <ListTitle text={"Products child 1"}></ListTitle>
              <ListTitle text={"Products child 2"}></ListTitle>
              <ListTitle text={"Products child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Posts"}
                  isCurrent={isOpenPost}
                  iconMaterial={
                    <span className="material-icons-outlined">feed</span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenPost}
                ></ListTitle>
              }
              isOpen={isOpenPost}
              onClick={() => setIsOpenPost(!isOpenPost)}
            >
              <ListTitle text={"Posts child 1"}></ListTitle>
              <ListTitle text={"Posts child 2"}></ListTitle>
              <ListTitle text={"Posts child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Portfolios"}
                  isCurrent={isOpenPortfolio}
                  iconMaterial={
                    <span className="material-icons-outlined">
                      auto_stories
                    </span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenPortfolio}
                ></ListTitle>
              }
              isOpen={isOpenPortfolio}
              onClick={() => setIsOpenPortfolio(!isOpenPortfolio)}
            >
              <ListTitle text={"Portfolios child 1"}></ListTitle>
              <ListTitle text={"Portfolios child 2"}></ListTitle>
              <ListTitle text={"Portfolios child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Components"}
                  isCurrent={isOpenComponent}
                  iconMaterial={
                    <span className="material-icons-outlined">
                      design_services
                    </span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenComponent}
                ></ListTitle>
              }
              isOpen={isOpenComponent}
              onClick={() => setIsOpenComponent(!isOpenComponent)}
            >
              <ListTitle text={"Components child 1"}></ListTitle>
              <ListTitle text={"Components child 2"}></ListTitle>
              <ListTitle text={"Components child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <ListTitle
              text={"Tools"}
              iconMaterial={
                <span className="material-icons-outlined">build</span>
              }
            ></ListTitle>
          </div>
          <div className={classNames(styles.item)}>
            <ListTitle
              text={"Taks"}
              iconMaterial={
                <span className="material-icons-outlined">task</span>
              }
            ></ListTitle>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Comments"}
                  isCurrent={isOpenComment}
                  iconMaterial={
                    <span className="material-icons-outlined">chat</span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenComment}
                ></ListTitle>
              }
              isOpen={isOpenComment}
              onClick={() => setIsOpenComment(!isOpenComment)}
            >
              <ListTitle text={"Comments child 1"}></ListTitle>
              <ListTitle text={"Comments child 2"}></ListTitle>
              <ListTitle text={"Comments child 3"}></ListTitle>
            </AsideAccording>
          </div>
          <div className={classNames(styles.item)}>
            <AsideAccording
              title={
                <ListTitle
                  text={"Settings"}
                  isCurrent={isOpenSetting}
                  iconMaterial={
                    <span className="material-icons-outlined">settings</span>
                  }
                  isShowToggle={true}
                  isToggleOpen={isOpenSetting}
                ></ListTitle>
              }
              isOpen={isOpenSetting}
              onClick={() => setIsOpenSetting(!isOpenSetting)}
            >
              <ListTitle text={"Settings child 1"}></ListTitle>
              <ListTitle text={"Settings child 2"}></ListTitle>
              <ListTitle text={"Settings child 3"}></ListTitle>
            </AsideAccording>
          </div>
        </div>
        <div className={classNames(styles.bg)}></div>
        {children}
      </aside>
    </>
  );
}
