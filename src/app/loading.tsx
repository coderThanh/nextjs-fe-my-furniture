import Loader from '@/components-root/loadder'
import LoaderCirle from '@/components-root/loadder/circle'

export default function Loading() {
  return (
    <>
      <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
        <LoaderCirle />
      </div>
    </>
  )
}
