import { IconCart, IconHearth, IconMenu } from '@/components-child/icon'
import AppButton, {
  AppButtonColor,
  AppButtonKind,
} from '@/components-root/button'
import AppImage from '@/components-root/img'
import AppLink from '@/components-root/link'
import ListTitle from '@/components-root/list-title'
import Search from '@/components-root/search'
import WindownE from '@/components-root/windown'
import WindownSecondE from '@/components-root/windown/windown-second'
import AppAssets from '@/consts/assets'
import { TITLE_PAGE } from '@/consts/const'
import { isConnectAPI } from '@/helpers'
import { useMenuHeaderMobile } from '@/hooks'
import {
  classMenuIcon,
  classMenuItem,
  classMenuLink,
  classMenuListTitle,
  classNav,
  classNavInner,
} from '@/ui/header'
import classNames from 'classnames'

export default function HeaderMobileMid() {
  // fetch
  const { menuData } = useMenuHeaderMobile()

  const wasConnectAPI = isConnectAPI()

  return (
    <>
      <div
        className={classNames('container', 'd-lg-none', 'header-mid mobile')}
      >
        <div className={classNames('header-mid-inner')}>
          <AppLink className={classNames('logo')} url={'/'}>
            <AppImage
              src={AppAssets.imgLogoDark}
              alt={TITLE_PAGE}
              width={200}
              height={24}
              styleImg={{ objectFit: 'contain', objectPosition: 'left' }}
              priority={true}
            />
          </AppLink>
          <div className={classNames(classNav, 'right')}>
            <div className={classNames(classNavInner)}>
              {!wasConnectAPI && (
                <div className={classNames(classMenuItem)}>
                  <AppButton
                    kind={AppButtonKind.default}
                    color={AppButtonColor.white}
                    className={classNames(classMenuIcon)}
                  >
                    <>
                      <IconHearth className={classNames('icon')} />
                      <span className={classNames('number')}>0</span>
                    </>
                  </AppButton>
                </div>
              )}
              {!wasConnectAPI && (
                <div className={classNames(classMenuItem)}>
                  <AppButton
                    kind={AppButtonKind.default}
                    color={AppButtonColor.white}
                    className={classNames(classMenuIcon)}
                  >
                    <>
                      <IconCart className={classNames('icon')} />
                      <span className={classNames('number')}>0</span>
                    </>
                  </AppButton>
                </div>
              )}
              <div className={classNames(classMenuItem)}>
                {/* Windown nav */}
                <WindownE
                  classWrap="header-windown"
                  isShow={false}
                  before={
                    <AppButton
                      kind={AppButtonKind.default}
                      color={AppButtonColor.white}
                      className={classNames(classMenuIcon)}
                    >
                      <>
                        <IconMenu className={classNames('icon')} />
                      </>
                    </AppButton>
                  }
                >
                  <>
                    <div className={classNames('windown-logo')}>
                      <AppLink className={classNames('logo')} url={'/'}>
                        <AppImage
                          src={AppAssets.imgLogoDark}
                          alt={TITLE_PAGE}
                          width={200}
                          height={24}
                          styleImg={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                          }}
                          priority={true}
                        />
                      </AppLink>
                    </div>

                    <div className={classNames('windown-nav', 'nav')}>
                      <div className={classNames(classMenuItem, 'search')}>
                        <Search />
                      </div>

                      {/* Nav item */}
                      {menuData?.map((item, index) => {
                        var content = null

                        if (item?.children?.length > 0) {
                          content = (
                            <div
                              key={index}
                              className={classNames(classMenuItem, 'highlight')}
                            >
                              <WindownSecondE
                                isShow={false}
                                title={item.title}
                                neighbor={
                                  <ListTitle
                                    text={item.title}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>
                                  {item.children.map((children, indexChild) => {
                                    return (
                                      <div
                                        key={indexChild}
                                        className={classNames(classMenuItem)}
                                      >
                                        <AppLink
                                          url={children?.url}
                                          className={classNames(classMenuLink)}
                                        >
                                          {children?.title}
                                        </AppLink>
                                      </div>
                                    )
                                  })}
                                </>
                              </WindownSecondE>
                            </div>
                          )
                        } else {
                          content = (
                            <div
                              key={index}
                              className={classNames(classMenuItem)}
                            >
                              <AppLink
                                url={item?.url}
                                className={classNames(classMenuLink)}
                              >
                                {item?.title}
                              </AppLink>
                            </div>
                          )
                        }

                        return content
                      })}
                    </div>
                  </>
                </WindownE>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
