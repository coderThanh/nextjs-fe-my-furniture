import AppButton, {
  AppButtonColor,
  AppButtonKind,
} from '@/components-root/button'

import {
  IconAccount,
  IconCart,
  IconEsc,
  IconHearth,
  IconSearch,
} from '@/components-child/icon'
import classNames from 'classnames'
import { classMenuIcon, classMenuItem } from '.'
import { isConnectAPI } from '@/helpers'

export default function HeaderMidRight({ isShowSearch, handleSearchClick }) {
  const isConnectedApi = isConnectAPI()
  return (
    <>
      <div className={classNames('mid-nav_right')}>
        <div className={classNames(classMenuItem)}>
          <AppButton
            kind={isShowSearch ? AppButtonKind.default : AppButtonKind.text}
            color={AppButtonColor.dark}
            className={classNames('btn-icon')}
            onClick={handleSearchClick}
          >
            <>
              {!isShowSearch && <IconSearch className={classNames('icon')} />}
              {isShowSearch && <IconEsc className={classNames('icon')} />}
            </>
          </AppButton>
        </div>
        {!isConnectedApi && (
          <div className={classNames(classMenuItem)}>
            <AppButton
              kind={AppButtonKind.text}
              color={AppButtonColor.dark}
              className={classNames(classMenuIcon)}
            >
              <IconAccount className={classNames('icon')} />
            </AppButton>
          </div>
        )}
        {!isConnectedApi && (
          <div className={classNames(classMenuItem)}>
            <AppButton
              kind={AppButtonKind.text}
              color={AppButtonColor.dark}
              className={classNames(classMenuIcon)}
            >
              <>
                <IconHearth className={classNames('icon')} />
                <span className={classNames('number')}>0</span>
              </>
            </AppButton>
          </div>
        )}
        {!isConnectedApi && (
          <div className={classNames(classMenuItem)}>
            <AppButton
              kind={AppButtonKind.text}
              color={AppButtonColor.dark}
              className={classNames(classMenuIcon)}
            >
              <>
                <IconCart className={classNames('icon')} />
                <span className={classNames('number')}>0</span>
              </>
            </AppButton>
          </div>
        )}
      </div>
    </>
  )
}
