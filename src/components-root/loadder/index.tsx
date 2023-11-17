import classNames from 'classnames'
import React from 'react'
import { FadeLoader, BarLoader } from 'react-spinners'

type Props = {
  loading?: boolean
  spinner?: string
  color?: string
  isCenter?: boolean
}

const Loader = ({
  loading,
  spinner = 'scale',
  color = '0989FF',
  isCenter,
}: Props) => {
  return (
    <div className={classNames({ 'd-flex justify-content-center': isCenter })}>
      {spinner === 'scale' && (
        <BarLoader
          color={`#${color}`}
          loading={loading}
          height={5}
          width={70}
        />
      )}
      {spinner === 'fade' && <FadeLoader loading={loading} color="#0989FF" />}
    </div>
  )
}

export default Loader
