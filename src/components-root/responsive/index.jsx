import { useState, useEffect, ReactNode } from 'react'

export default function Responsive({ desktopBig, desktop, table, phone }) {
  const [windowWidth, setWindowWidth] = useState(0)

  const maxPhone = 575
  const maxTable = 768
  const maxDesktop = 1024

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }

    if (typeof window != undefined) {
      handleWindowResize()
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  if (phone && windowWidth <= maxPhone) {
    return phone
  }

  if (table && windowWidth <= maxTable) {
    return table
  }

  if (desktopBig && windowWidth > maxDesktop) {
    return desktopBig
  }

  return desktop
}
