export default function MsgDefault({ text, isError }) {
  return <p style={{ color: isError ? 'red' : null }}>{text}</p>
}
