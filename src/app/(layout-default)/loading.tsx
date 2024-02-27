import Loader from '@/components-root/loadder'

export default function Loading() {
  return (
    <>
      <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
        <Loader isCenter={true} loading={true} />
      </div>
    </>
  )
}
