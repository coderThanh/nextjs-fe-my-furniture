type Props = {
  text?: string
  isError?: boolean
}
export default function MsgDefault({ text, isError }: Props) {
  return <p style={{ color: isError ? 'red' : undefined }}>{text}</p>
}
