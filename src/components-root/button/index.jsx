import classNames from 'classnames'
import AppLink from '../link'

import styles from './button.module.scss'

export const AppButtonKind = {
  text: 'text',
  outline: 'outline',
  default: 'default',
}

export const AppButtonColor = {
  primary: 'primary',
  white: 'white',
  whiteTransparent: 'whiteTransparent',
  dark: 'dark',
  darkTransparent: 'darkTransparent',
  error: 'error',
  tertiary: 'tertiary',
  secondary: 'secondary',
}

export const AppButtonSize = {
  default: 'default',
  small: 'small',
}

// HTMLDivElement
export default function AppButton(props) {
  return (
    <>
      <AppLink
        url={props.url}
        className={classNames(
          'btn',
          props.className,
          styles.wrap,
          props.kind == AppButtonKind.default && styles.default,
          props.kind == AppButtonKind.text && styles.text + ' btn_text',
          props.kind == AppButtonKind.outline &&
            styles.outline + ' btn_outline',
          props.color == AppButtonColor.primary && styles.primary + ' primary',
          props.color == AppButtonColor.white && styles.white + ' white',
          props.color == AppButtonColor.whiteTransparent &&
            styles.whiteTransparent + ' white-transparent',
          props.color == AppButtonColor.dark && styles.dark + ' dark',
          props.color == AppButtonColor.darkTransparent &&
            styles.darkTransparent + ' dark-transparent',
          props.color == AppButtonColor.tertiary &&
            styles.tertiary + ' tertiary',
          props.color == AppButtonColor.error && styles.error + ' error',
          props.color == AppButtonColor.secondary &&
            styles.secondary + ' secondary',
          props.size == AppButtonSize.small && styles.small + ' small',
        )}
      >
        <div
          className={classNames('btn-inner', styles.inner)}
          onClick={() => props.onClick && props.onClick()}
        >
          <div className={classNames(styles.content, 'btn-content')}>
            {props.children}
            {props.text && (
              <span className={classNames(styles.textWrap, 'btn-title')}>
                {props.text}
              </span>
            )}
          </div>
          <div className={classNames(styles.bg, 'btn-bg')}></div>
        </div>
      </AppLink>
    </>
  )
}
