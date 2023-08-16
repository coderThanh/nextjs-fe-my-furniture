import React from 'react'
import { FadeLoader, BarLoader } from 'react-spinners'

const Loader = ({ loading, spinner = 'scale', color = '0989FF' }) => {
  return (
    <div className="text-center">
      {spinner === 'scale' && (
        <BarLoader
          color={`#${color}`}
          loading={loading}
          height={6}
          width={70}
          margin={2}
        />
      )}
      {spinner === 'fade' && <FadeLoader loading={loading} color="#0989FF" />}
    </div>
  )
}

export default Loader
