import AppAssets from '@/consts/assets'
import AppConst from '@/models/const'
import classNames from 'classnames'
import { IconCart, IconMenu } from '@/components-child/icon'
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

export default function HeaderMobileMid() {
  // Defint class tag
  const classMenuItem = 'menu-item'
  const classMenuLink = 'menu-link'
  const classMenuIcon = 'menu-icon'
  const classMenuListTitle = 'menu-l-title'
  const classNav = 'nav'
  const classNavInner = 'nav-inner'

  // Demo menu item
  const demoMenuItem = (
    <>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Scandinavian
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Japandi
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Minimalism
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Xu hướng
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Thảo luận
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Mid centry
        </AppLink>
      </div>
      <div className={classNames(classMenuItem)}>
        <AppLink url={'/category'} classLink={classNames(classMenuLink)}>
          Ngẫu nhiên
        </AppLink>
      </div>
    </>
  )

  return (
    <>
      <div
        className={classNames('container', 'd-md-none', 'header-mid mobile')}
      >
        <div className={classNames('header-mid-inner')}>
          <AppLink classLink={classNames('logo')} url={'/'}>
            <AppImage
              src={AppAssets.imgLogoDark}
              alt={AppConst.titleDefault}
              width={200}
              height={60}
              styleImg={{ objectFit: 'contain', objectPosition: 'left' }}
              priority={true}
            />
          </AppLink>
          <div className={classNames(classNav, 'right')}>
            <div className={classNames(classNavInner)}>
              <div className={classNames(classMenuItem)}>
                <AppButton
                  kind={AppButtonKind.default}
                  color={AppButtonColor.white}
                  className={classNames(classMenuIcon)}
                >
                  <>
                    <IconCart className={classNames('icon')} />
                    <span className={classNames('number')}>30</span>
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
                        <IconMenu className={classNames('icon')} />
                      </>
                    </AppButton>
                  }
                >
                  <>
                    <div className={classNames('windown-logo')}>
                      <AppLink classLink={classNames('logo')} url={'/'}>
                        <AppImage
                          src={AppAssets.imgLogoDark}
                          alt={AppConst.titleDefault}
                          width={200}
                          height={40}
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

                      <div className={classNames(classMenuItem, 'highlight')}>
                        <WindownSecondE
                          isShow={false}
                          title={'Chuyện nhà'}
                          neighbor={
                            <ListTitle
                              text={' Chuyện nhà '}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>
                            <div
                              className={classNames(classMenuItem, 'highlight')}
                            >
                              <WindownSecondE
                                isShow={false}
                                title={'Chuyện nhà'}
                                neighbor={
                                  <ListTitle
                                    text={' Chuyện nhà '}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>{demoMenuItem}</>
                              </WindownSecondE>
                            </div>
                            <div
                              className={classNames(classMenuItem, 'highlight')}
                            >
                              <WindownSecondE
                                isShow={false}
                                title={'Chuyện nhà'}
                                neighbor={
                                  <ListTitle
                                    text={' Chuyện nhà '}
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
                                title={'Chuyện nhà'}
                                neighbor={
                                  <ListTitle
                                    text={' Chuyện nhà '}
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
                                title={'Chuyện nhà'}
                                neighbor={
                                  <ListTitle
                                    text={' Chuyện nhà '}
                                    isShowToggle={true}
                                    classNameWrap={classMenuListTitle}
                                  ></ListTitle>
                                }
                              >
                                <>{demoMenuItem}</>
                              </WindownSecondE>
                            </div>
                            <div className={classNames('nav-2nd')}>
                              {demoMenuItem}
                            </div>
                          </>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem, 'highlight')}>
                        <WindownSecondE
                          isShow={false}
                          title={'Chuyện nhà 1'}
                          neighbor={
                            <ListTitle
                              text={' Chuyện nhà 1'}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>
                      <div className={classNames(classMenuItem, 'highlight')}>
                        <WindownSecondE
                          isShow={false}
                          title={'Chuyện nhà 2'}
                          neighbor={
                            <ListTitle
                              text={' Chuyện nhà 2'}
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
                          title={'Chuyện nhà 3'}
                          neighbor={
                            <ListTitle
                              text={' Chuyện nhà 3'}
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
                          title={'Chuyện nhà 4'}
                          neighbor={
                            <ListTitle
                              text={' Chuyện nhà 4'}
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
                          title={'Chuyện nhà 5'}
                          neighbor={
                            <ListTitle
                              text={' Chuyện nhà 5'}
                              isShowToggle={true}
                              classNameWrap={classMenuListTitle}
                            ></ListTitle>
                          }
                        >
                          <>{demoMenuItem}</>
                        </WindownSecondE>
                      </div>

                      <div className={classNames('nav-2nd')}>
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
  )
}
