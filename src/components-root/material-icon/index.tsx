import classNames from 'classnames'

export const AppMaterialIconType = {
  outlined: 'material-icons-outlined',
  filled: 'material-icons',
  round: 'material-icons-round',
}

export default function AppMaterialIcon(props) {
  return (
    <span
      style={{
        fontSize: props.size,
      }}
      className={classNames(props.type, props.className, 'mater-icon')}
    >
      {props.children}
    </span>
  )
}
