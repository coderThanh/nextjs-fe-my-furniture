import Link from 'next/link'

export default function AppLink({
  url,
  className,
  target,
  rel,
  children,
  title,
}) {
  return (
    <>
      {url && (
        <Link
          title={title}
          className={className}
          href={url}
          target={target}
          rel={rel}
        >
          {children}
        </Link>
      )}
      {!url && <div className={className}>{children}</div>}
    </>
  )
}
